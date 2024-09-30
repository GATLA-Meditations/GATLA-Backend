import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StreakRespository {
  constructor(private readonly prisma: PrismaService) {}

  async incrementStreak(userId: string, increment: number) {
    const currentStreak = await this.prisma.streak.update({
      where: {
        userId,
      },
      data: {
        streak: {
          increment: increment,
        },
        lastUpdate: new Date(),
      },
    });

    await this.prisma.ingameData.updateMany({
      data: {
        maxStreak: currentStreak.streak,
      },
      where: {
        userId: userId,
        maxStreak: {
          lte: currentStreak.streak,
        },
      },
    });

    return currentStreak;
  }

  async getStreakByUserId(userId: string) {
    return this.prisma.streak.findUnique({
      where: {
        userId,
      },
    });
  }

  async resetStreak(userId: string) {
    return this.prisma.streak.update({
      where: {
        userId,
      },
      data: {
        streak: 0,
      },
    });
  }

  async createAndAssignStreak(userId: string) {
    return this.prisma.streak.create({
      data: {
        userId,
        streak: 1,
        type: 'daily',
      },
    });
  }

  async resetStreaksUpdatedBeforeDate(date: Date) {
    return this.prisma.streak.updateMany({
      where: {
        lastUpdate: {
          lt: date,
        },
      },
      data: {
        streak: 0,
      },
    });
  }
}
