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

  async createTreatment(treatmentData: { name: string; description: string }) {
    return this.adminRepository.createTreatment(treatmentData);
  }

  async updateTreatment(id: string, treatmentData?: { name?: string; description?: string }) {
    return this.adminRepository.updateTreatment(id, treatmentData);
  }

  async createModule(moduleData: { name: string; description: string }) {
    return await this.adminRepository.createModule(moduleData);
  }

  async updateModule(id: string, moduleData: { name?: string; description?: string }) {
    return await this.adminRepository.updateModule(id, moduleData);
  }

  async updateModulesFromTreatment(id: string, modules: { id: string; order: number }[]) {
    return await this.adminRepository.updateModulesFromTreatment(id, modules);
  }

  async updateActivitiesFromModules(id: string, activitiesData: { id?: string; order?: number }[]) {
    return await this.adminRepository.updateActivitiesFromModules(id, activitiesData);
  }

  async getUsers() {
    return await this.adminRepository.getUsers();
  }

  async updateUser(
    id: string,
    userData: {
      patient_code?: string;
      password?: string;
      treatment?: { id: string };
    },
  ) {
    if (userData.patient_code || userData.password) {
      await this.adminRepository.updateUserBasicData(id, userData);
    }
    if (userData.treatment) {
      await this.adminRepository.updateUserTreatmentData(id, userData.treatment);
    }
  }
}
