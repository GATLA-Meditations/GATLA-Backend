import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AchievementUser } from './dto/achievement.dto';

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
    const results: any = await this.prisma.userAchievement.findMany({
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
    return await results.map((result) => {
      new AchievementUser(result);
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
