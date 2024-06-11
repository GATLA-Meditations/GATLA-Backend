import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getModuleById(id: string) {
    return this.prisma.module.findUnique({
      where: { id: id },
      include: {
        activities: {
          include: {
            activity: true,
          },
        },
      },
    });
  }

  async getUserModuleByModuleIdAndUserId(moduleId: string, userId: string) {
    return this.prisma.userModule.findFirst({
      where: {
        userId,
        moduleId,
      },
      include: {
        module: {
          include: {
            activities: {
              include: {
                activity: true,
              },
            },
          },
        },
        minutesSpent: true,
      },
    });
  }

  async findActualModuleFromUser(userId: string) {
    return this.prisma.userModule.findFirst({
      where: {
        userId: userId,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gt: new Date(),
        },
      },
      include: {
        module: {
          include: {
            activities: true,
          },
        },
        minutesSpent: true,
      },
    });
  }

  async getModulesByTreatmentId(treatementId: string) {
    return this.prisma.treatmentModule.findMany({
      where: {
        treatment_id: treatementId,
      },
      include: {
        module: true,
      },
    });
  }

  async createUserModule(userId: string, id: string, date: Date) {
    // TODO: chequear que no sean los modulos de cuestionarios
    const endDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7, 0, 0, 0);
    console.log('endDate:', endDate);
    return this.prisma.userModule.create({
      data: {
        userId,
        moduleId: id,
        startDate: date,
        endDate: endDate,
      },
    });
  }

  async getUserIngameData(id: string) {
    return this.prisma.ingameData.findFirst({
      where: { userId: id },
    });
  }
}
