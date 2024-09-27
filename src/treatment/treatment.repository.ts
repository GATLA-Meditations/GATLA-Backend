import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
