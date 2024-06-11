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
      },
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

  async getUserTests(id: string) {
    return this.prisma.userTreatment.findFirst({
      where: { userId: id },
    });
  }
  async changeUserPassword(id: string, password: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async getUserProfile(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        achievements: {
          include: {
            Achievement: true,
          },
          take: 8,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
}
