import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getActivityById(id: string) {
    return this.prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        contents: {
          include: {
            content: true,
          },
        },
      },
    });
  }
}
