import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModuleRepository {
  constructor(private readonly prisma: PrismaService) {
  }

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
}
