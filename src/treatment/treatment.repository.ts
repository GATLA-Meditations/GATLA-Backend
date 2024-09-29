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
    const treatment = await this.prisma.treatment.create({
      data: {
        name: treatmentData.name,
        description: treatmentData.description,
        questionnaires: {
          connect: treatmentData.questionnaires.map((questionnaire) => ({ id: questionnaire })),
        },
      },
    });
    for (const module of treatmentData.modules) {
      const createdModule = await this.prisma.module.create({
        data: {
          name: module.name,
          description: module.description,
          treatments: {
            connect: {
              id: treatment.id,
              order: module.order,
            },
          },
        },
      });
      for (const activity of module.activities) {
        const createdActivity = await this.prisma.activity.create({
          data: {
            name: activity.name,
            modules: {
              connect: {
                id: createdModule.id,
                order: activity.order,
              },
            },
          },
        });
        for (const content of activity.contents) {
          await this.prisma.content.create({
            data: {
              type: content.type,
              content: content.content,
              activities: {
                connect: {
                  id: createdActivity.id,
                  order: content.order,
                },
              },
            },
          });
        }
      }
    }
  }
}
