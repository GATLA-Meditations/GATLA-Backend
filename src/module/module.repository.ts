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
    });
  }
}
