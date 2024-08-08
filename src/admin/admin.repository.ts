import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AdminData } from './dto/AdminData';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(adminData: AdminData) {
    return this.prisma.admin.create({
      data: adminData,
    });
  }
}
