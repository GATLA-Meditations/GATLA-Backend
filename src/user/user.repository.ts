import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        treatments: true,
      }
    });
  }

  async subscirbeToTreatment(userId: string, treatmentId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        treatments: {
          connect: {
            id: treatmentId,
          },
        },
      },
    });
  }
}
