import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AchievementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAchievementById(id: string) {
    return this.prisma.achievement.findUnique({
      where: {
        id,
      },
      include: {
        dataKey: true,
      },
    });
  }

  async getAchievementsByUserId(userId: string) {
    return this.prisma.userAchievement.findMany({
      where: {
        userId: userId,
      },
      include: {
        Achievement: {
          include: {
            dataKey: true,
          },
        },
      },
    });
  }

  async getAchievements() {
    return this.prisma.achievement.findMany({
      include: {
        dataKey: true,
      },
    });
  }
}
