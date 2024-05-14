import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TreatmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTreatmentById(id: string) {
    return this.prisma.treatment.findUnique({
      where: { id: id },
      include: {
        modules: {
          include: {
            module: true,
          },
        },
      },
    });
  }
}
