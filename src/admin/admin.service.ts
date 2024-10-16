import { HttpException, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';
import createQuestionnaireDto from './dto/create-questionnaire.dto';
import { ModuleService } from 'src/module/module.service';
import { MailService } from 'src/mail/mail.service';
import { ShopItemType } from '@prisma/client';
import { TreatmentService } from 'src/treatment/treatment.service';
import TreatmentCreateDto, { ContentModifyDto } from 'src/treatment/dto/treatment-create.dto';
import { UserDataDto } from './dto/user-data.dto';


@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly modules: ModuleService,
    private readonly mailService: MailService,
    private readonly treatmentService: TreatmentService,
  ) {}

  async notifyUser(notificationId: string, userId: string) {
    return await this.adminRepository.notifyUser(notificationId, userId);
  }

  async createNotification(notificationData: { title: string; content: string }) {
    return await this.adminRepository.createNotification(notificationData);
  }

  async updateQuestionnaire(id: string, questionnaireData: createQuestionnaireDto) {
    const treatments = await this.adminRepository.getQuestionnaireTreatments(id);
    this.disconnectQuestionnaireFromTreatments(id);
    questionnaireData.treatmentId = treatments.treatments.map((treatment) => treatment.id);
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async disconnectQuestionnaireFromTreatments(id: string) {
    return await this.adminRepository.disconnectQuestionnaireFromTreatments(id);
  }

  async createQuestionnaire(questionnaireData: createQuestionnaireDto) {
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async deleteUser(patient_code: string) {
    console.log(patient_code);
    const user = await this.adminRepository.getUser(patient_code);
    return await this.adminRepository.deleteUser(user.id);
  }

  async createUser(userData: { patient_code: string; password: string; email: string; treatment?: { id: string; delayed: boolean } }) {
    const treatment = userData.treatment;
    const user = await this.adminRepository.createUser(userData.patient_code, userData.password);
    if (treatment != null) {
      await this.adminRepository.subscirbeUsertToTreatment(user.id, treatment.id);
      await this.modules.createUserModules(user.id, treatment.id, treatment.delayed);
    }
    await this.mailService.sendMail(
      userData.email,
      'Credenciales Renacentia',
      'Bienvenido a Renacentia, tus credenciales son:\n codigo: ' + userData.patient_code + '\n contraseña: ' + userData.password,
    );
    return user;
  }

  async createAdmin(adminData: AdminData) {
    return await this.adminRepository.createAdmin(adminData);
  }

  async updateAdmin(id: string, adminData: UpdateAdmin) {
    return this.adminRepository.updateAdmin(id, adminData);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepository.deleteAdmin(id);
  }

  async createTreatment(treatmentData: TreatmentCreateDto) {
    return await this.treatmentService.createTreatment(treatmentData);
  }

  async updateTreatment(id: string, treatmentData?: { name?: string; description?: string }) {
    return this.adminRepository.updateTreatment(id, treatmentData);
  }

  async addQuestionnaireToTreatment(treatmentId: string, questionnaireId: string) {
    return await this.adminRepository.addQuestionnaireToTreatment(treatmentId, questionnaireId);
  }

  async getModuleById(id: string) {
    return await this.modules.getModuleByIdForAdmin(id);
  }

  async createModule(moduleData: { name: string; description: string }) {
    return await this.adminRepository.createModule(moduleData);
  }

  async updateModule(id: string, moduleData: { name?: string; description?: string }) {
    return await this.adminRepository.updateModule(id, moduleData);
  }

  async updateModulesFromTreatment(id: string, modules: { id: string; order: number }[]) {
    return await this.adminRepository.updateModulesFromTreatment(id, modules);
  }

  async updateActivitiesFromModules(id: string, activitiesData: { id?: string; order?: number }[]) {
    return await this.adminRepository.updateActivitiesFromModules(id, activitiesData);
  }

  async getUsers() {
    return await this.adminRepository.getUsers();
  }

  async updateUser(
    id: string,
    userData: {
      patient_code?: string;
      password?: string;
      treatment?: { id: string };
    },
  ) {
    if (userData.patient_code || userData.password) {
      await this.adminRepository.updateUserBasicData(id, userData);
    }
    if (userData.treatment) {
      await this.adminRepository.updateUserTreatmentData(id, userData.treatment);
    }
  }

  async createShopItem(shopItemData: { type: ShopItemType; price: number; content_url: string }) {
    return await this.adminRepository.createShopItem(shopItemData);
  }

  async updateContentsInActivity(activityId: string, contents: ContentModifyDto[]) {
    for (const content of contents) {
      if (content.id) {
        await this.adminRepository.updateContentInActivity(content.id, content);
      } else {
        await this.adminRepository.createContentInActivity(activityId, content);
      }
    }
  }

  async disconectContentFromActivity(activityId: string, contentId: string) {
    return await this.adminRepository.disconectContentFromActivity(activityId, contentId);
  }

  async createModuleForTreatment(id: string) {
    return await this.treatmentService.createModule(id);
  }

  async getUserById(id: string) {
    const user = await this.adminRepository.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return new UserDataDto(user.id, user.patient_code, user.password, user.treatments);
  }
}
