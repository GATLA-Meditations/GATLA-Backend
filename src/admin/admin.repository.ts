import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';
import createQuestionnaireDto from './dto/create-questionnaire.dto';
import { ShopItemType } from '@prisma/client';
import { ContentModifyDto } from 'src/treatment/dto/treatment-create.dto';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(patient_code: string) {
    return this.prisma.user.findUnique({
      where: { patient_code },
    });
  }

  async getQuestionnaireTreatments(id: string) {
    return this.prisma.questionnaire.findUnique({
      where: { id: id },
      select: {
        treatments: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async disconnectQuestionnaireFromTreatments(id: string) {
    return this.prisma.questionnaire.update({
      where: { id: id },
      data: {
        treatments: {
          set: [],
        },
      },
    });
  }

  async createQuestionnaire(questionnaireData: createQuestionnaireDto) {
    return this.prisma.questionnaire.create({
      data: {
        name: questionnaireData.name,
        questions: {
          create: questionnaireData.questions,
        },
        treatments: {
          connect: questionnaireData.treatmentId.map((id) => ({ id: id })),
        },
      },
    });
  }

  async addQuestionnaireToTreatment(treatmentId: string, questionnaireId: string) {
    return this.prisma.treatment.update({
      where: { id: treatmentId },
      data: {
        questionnaires: {
          connect: { id: questionnaireId },
        },
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async createUser(patient_code: string, password: string) {
    return this.prisma.user.create({
      data: {
        patient_code,
        password,
      },
    });
  }

  async createAdmin(adminData: AdminData) {
    return this.prisma.admin.create({
      data: adminData,
    });
  }

  async updateAdmin(id: string, adminData: UpdateAdmin) {
    return this.prisma.admin.update({
      where: { id: id },
      data: adminData,
    });
  }

  async deleteAdmin(id: string) {
    return this.prisma.admin.delete({
      where: { id: id },
    });
  }

  createTreatment(treatmentData: { name: string; description: string }) {
    return this.prisma.treatment.create({
      data: treatmentData,
    });
  }

  async updateTreatment(id: string, treatmentData: { name?: string; description?: string }) {
    return this.prisma.treatment.update({
      where: { id: id },
      data: {
        name: treatmentData.name,
        description: treatmentData.description,
      },
    });
  }

  async createModule(moduleData: { name: string; description: string }) {
    return this.prisma.treatment.create({
      data: moduleData,
    });
  }

  async updateModule(id: string, moduleData: { name?: string; description?: string }) {
    return this.prisma.module.update({
      where: { id: id },
      data: {
        name: moduleData.name,
        description: moduleData.description,
      },
    });
  }

  async updateModulesFromTreatment(treatment_id: string, modules: { id: string; order: number }[]) {
    //disconnect all modules from treatment
    await this.prisma.treatmentModule.deleteMany({
      where: { treatment_id: treatment_id },
    });

    const new_module_data: { treatment_id: string; module_id: string; order: number }[] = modules.map((module) => ({
      treatment_id: treatment_id,
      module_id: module.id, // Map id from modules to module_id
      order: module.order, // Preserve the order from modules
    }));

    //reconnect them in updated form
    return this.prisma.treatmentModule.createMany({
      data: new_module_data,
    });
  }

  async updateActivitiesFromModules(module_id: string, activitiesData: { id?: string; order?: number }[]) {
    // disconnect all activities from module
    await this.prisma.moduleActivity.deleteMany({
      where: { moduleId: module_id },
    });

    const new_activities_data: { activityId: string; moduleId: string; order: number }[] = activitiesData.map((activity) => ({
      activityId: activity.id, // Map id from modules to module_id
      moduleId: module_id,
      order: activity.order, // Preserve the order from modules
    }));

    //reconnect them in updated format
    return this.prisma.moduleActivity.createMany({
      data: new_activities_data,
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        patient_code: true,
        password: true,
        friendsId: true,
        treatments: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateUserBasicData(
    id: string,
    userData: {
      patient_code?: string;
      password?: string;
      treatment?: { id: string };
    },
  ) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        patient_code: userData.patient_code,
        password: userData.password,
      },
    });
  }

  async updateUserTreatmentData(id: string, treatment: { id: string }) {
    //delete current userTreatment
    await this.prisma.userTreatment.deleteMany({
      where: { userId: id },
    });

    //create new connection for treatment
    await this.prisma.userTreatment.create({
      data: {
        userId: id,
        treatmentId: treatment.id,
      },
    });
  }

  async subscirbeUsertToTreatment(userId: string, treatmentId: string) {
    await this.prisma.userTreatment.create({
      data: {
        user: { connect: { id: userId } },
        treatment: { connect: { id: treatmentId } },
      },
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        treatments: {
          connect: {
            id: treatmentId,
          },
        },
      },
    });
  }

  async createShopItem(shopItemData: { type: ShopItemType; price: number; content_url: string }) {
    return this.prisma.shopItem.create({
      data: shopItemData,
    });
  }

  async updateContentInActivity(activityId: string, content: ContentModifyDto) {
    await this.prisma.activityContent.updateMany({
      where: {
        activityId: activityId,
        contentId: content.id,
      },
      data: {
        order: content.order,
      },
    });
    return this.prisma.content.update({
      where: { id: content.id },
      data: {
        type: content.type,
        content: content.content,
      },
    });
  }

  async createContentInActivity(activityId: string, content: ContentModifyDto) {
    const createdContent = await this.prisma.content.create({
      data: {
        type: content.type,
        content: content.content,
      },
    });
    await this.prisma.activityContent.create({
      data: {
        activityId: activityId,
        contentId: createdContent.id,
        order: content.order,
      },
    });
    return createdContent;
  }

  async disconectContentFromActivity(activityId: string, contentId: string) {
    return this.prisma.activityContent.deleteMany({
      where: {
        activityId,
        contentId,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        treatments: true,
      },
    });
  }

  async deleteContent(id: string) {
    return this.prisma.content.delete({
      where: { id },
    });
  }

  async getUsersPaginated(page: number, size: number) {
    const skip = (page - 1) * size;
    const take = size;

    return this.prisma.user.findMany({
      skip: skip,
      take: take,
    });
  }

  getUsersPaginatedWithFilter(page: number, size: number, code: string) {
    return this.prisma.user.findMany({
      where: {
        patient_code: {
          contains: code,
        },
      },
      skip: (page - 1) * size,
      take: size,
    });
  }

  async addFriend(id: string, friendId: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        friendsId: {
          push: friendId,
        },
      },
    });
    await this.prisma.user.update({
      where: { id: friendId },
      data: {
        friendsId: {
          push: id,
        },
      },
    });
  }
}
