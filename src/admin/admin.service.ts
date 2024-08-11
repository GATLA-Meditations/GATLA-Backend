import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async createAdmin(adminData: AdminData) {
    return await this.adminRepository.createAdmin(adminData);
  }

  async updateAdmin(id: string, adminData: UpdateAdmin) {
    return this.adminRepository.updateAdmin(id, adminData);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepository.deleteAdmin(id);
  }
}
