import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WeeklyDto } from './dto/weekly.dto';

@Injectable()
export class IngameDataRepository {
  constructor(private prisma: PrismaService) {}

  async updateMaxStreak(id: string, maxStreak: number) {
    return this.prisma.ingameData.update({
      where: {
        id,
      },
      data: {
        maxStreak: maxStreak,
      },
    });
  }

  async updateWeekly(id: string) {
    return this.prisma.ingameData.update({
      where: { userId: id },
      data: {
        lastWeekly: new Date(),
      },
    });
  }

  async getWeekly(id: string) {
    const today = new Date();
    const userData = await this.prisma.ingameData.findFirst({
      where: {
        userId: id,
      },
    });
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const timeDifference = today.getTime() - userData.lastWeekly.getTime();
    if (timeDifference >= oneWeekInMilliseconds) {
      const streakData = await this.prisma.streak.findFirst({
        where: { userId: id },
      });
      const minutesSpentOnModule = await this.prisma.userModuleMinutesSpent.aggregate({
        where: {
          AND: {
            userModule: { userId: id },
            createdAt: {
              gte: userData.lastWeekly,
              lte: today,
            },
          },
        },
        _sum: {
          minutesSpent: true,
        },
      });

      const moduleData = await this.prisma.userModule.findFirst({
        where: {
          userId: id,
          startDate: {
            lte: today, // Use lte for the nearest date before the reference date
          },
        },
        orderBy: {
          startDate: 'desc',
        },
        include: {
          module: {
            select: {
              name: true,
            },
          },
        },
      });

      const moduleTitle = moduleData.module.name;

      const streak = streakData.streak;
      const maxStreak = userData.maxStreak;

      const weeklyWatchTime = minutesSpentOnModule._sum.minutesSpent || 0;
      const totalWatchTime = userData.totalWatchTime;

      return new WeeklyDto(moduleTitle, streak, maxStreak, totalWatchTime, weeklyWatchTime);
    } else {
      return new BadRequestException('Not time for weekly yet');
    }
  }
}
