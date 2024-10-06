import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import TreatmentCreateDto from './dto/treatment-create.dto';

@Injectable()
export class TreatmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTreatments() {
    return this.prisma.treatment.findMany();
  }

  async getTreatmentById(id: string) {
    return this.prisma.treatment.findUnique({
      where: { id: id },
      include: {
        modules: {
          include: {
            module: true,
          },
        },
        questionnaires: true,
      },
    });
  }

  async findActualTreatmentFromUser(userId: string) {
    return this.prisma.treatment.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        modules: {
          include: {
            module: true,
          },
        },
        questionnaires: true,
      },
    });
  }

  async getUserTreatment(userId: string) {
    return this.prisma.userTreatment.findFirst({
      where: { userId: userId },
    });
  }

  async updateStartQuestionnaireAnswers(userTreatmentId: string) {
    return this.prisma.userTreatment.update({
      where: { id: userTreatmentId },
      data: {
        startAnswer: true,
      },
    });
  }

  async updateEndQuestionnaireAnswers(id: string) {
    return this.prisma.userTreatment.update({
      where: { id: id },
      data: {
        endAnswer: true,
      },
    });
  }

  async createCompleteTreatment(treatmentData: TreatmentCreateDto) {
    // 1. Create Treatment
    const treatment = await this.prisma.treatment.create({
      data: {
        name: treatmentData.name,
        description: treatmentData.description,
        questionnaires: {
          connect: treatmentData.questionnaires.map((questionnaire) => ({ id: questionnaire })),
        },
      },
    });
    console.log(`Treatment created with id: ${treatment.id}`);

    // 2. Create Modules
    for (const moduleData of treatmentData.modules) {
      const module = await this.prisma.module.create({
        data: {
          name: moduleData.name,
          description: moduleData.description,
        },
      });
      console.log(`Module created with id: ${module.id}`);

      // Connect Module to Treatment via TreatmentModule
      await this.prisma.treatmentModule.create({
        data: {
          treatment_id: treatment.id,
          module_id: module.id,
          order: moduleData.order,
        },
      });

      // 3. Create Activities for the Module
      for (const activityData of moduleData.activities) {
        const activity = await this.prisma.activity.create({
          data: {
            name: activityData.name,
          },
        });
        console.log(`Activity created with id: ${activity.id}`);

        // Connect Activity to Module via ModuleActivity
        await this.prisma.moduleActivity.create({
          data: {
            moduleId: module.id,
            activityId: activity.id,
            order: activityData.order,
          },
        });

        // 4. Create Contents for the Activity
        for (const contentData of activityData.contents) {
          const content = await this.prisma.content.create({
            data: {
              type: contentData.type,
              content: contentData.content,
            },
          });
          console.log(`Content created with id: ${content.id}`);

          // Connect Content to Activity via ActivityContent
          await this.prisma.activityContent.create({
            data: {
              activityId: activity.id,
              contentId: content.id,
              order: contentData.order,
            },
          });
        }
      }
    }
    //connect the questionnaires to the tratment and return te complete treatment
    return await this.prisma.treatment.update({
      where: { id: treatment.id },
      data: {
        questionnaires: {
          connect: treatmentData.questionnaires.map((questionnaire) => ({ id: questionnaire })),
        },
      },
      include: {
        modules: {
          include: {
            module: {
              include: {
                activities: {
                  include: {
                    activity: {
                      include: {
                        contents: {
                          include: {
                            content: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        questionnaires: true,
      },
    });
  }
}
