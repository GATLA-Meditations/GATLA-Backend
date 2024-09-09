import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
