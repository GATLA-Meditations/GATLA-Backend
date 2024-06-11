import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

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
}
