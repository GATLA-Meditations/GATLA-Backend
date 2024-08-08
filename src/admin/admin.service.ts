import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminData } from './dto/AdminData';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async createAdmin(adminData: AdminData) {
    return await this.adminRepository.createAdmin(adminData);
  }
}
