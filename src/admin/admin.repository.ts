import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(adminData: AdminData) {
    return this.prisma.admin.create({
      data: adminData,
    });
  }

  async updateAdmin(id: string, adminData: UpdateAdmin) {
    return this.prisma.admin.update({
      where: { id: id },
      data: adminData,
    });
  }

  async deleteAdmin(id: string) {
    return this.prisma.admin.delete({
      where: { id: id },
    });
  }
}
