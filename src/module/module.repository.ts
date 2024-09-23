import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async unlockNextActivity(id: string, lastViewedOrder: number) {
    return this.prisma.userModule.update({
      where: {
        id,
      },
      data: {
        lastViewedOrder: lastViewedOrder,
      },
    });
  }

  async getModuleById(id: string) {
    return this.prisma.module.findUnique({
      where: { id: id },
      include: {
        activities: {
          include: {
            activity: {
              include: {
                contents: {
                  include: {
                    content: {},
                  },
                },
              },
            },
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.prisma.userModule.findMany({
      where: {
        userId: userId,
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
      },
      include: {
        module: {
          include: {
            activities: {
              include: {
                activity: {},
              },
            },
          },
        },
        minutesSpent: true,
      },
    });
  }

  async getUserMinutesSpent(userId: string) {
    const date = new Date();
    return this.prisma.userModule.findMany({
      where: {
        userId,
        startDate: {
          lte: date,
        },
        endDate: {
          gt: date,
        },
      },
      include: {
        minutesSpent: {},
      },
    });
  }

  createUserMinutesSpent(userModuleId: string, minutesSpent: number) {
    return this.prisma.userModuleMinutesSpent.create({
      data: {
        userModuleId,
        minutesSpent,
      },
    });
  }

  updateUserMinutesSpent(id: string, minutesSpent: number) {
    return this.prisma.userModuleMinutesSpent.update({
      where: {
        id,
      },
      data: {
        minutesSpent,
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
    const endDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 6, 0, 0, 0);
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

  async updateMaxMinutesSpent(userId: string, time: number) {
    time = Number(time);
    const ingameData = await this.getUserIngameData(userId);
    if (!ingameData) {
      return this.prisma.ingameData.create({
        data: {
          userId: userId,
          totalWatchTime: time,
        },
      });
    }
    if (ingameData.totalWatchTime === null) {
      ingameData.totalWatchTime = 0;
    }
    return this.prisma.ingameData.update({
      where: { userId: userId },
      data: {
        totalWatchTime: ingameData.totalWatchTime + time,
      },
    });
  }
}
