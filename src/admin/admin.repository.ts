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

  createTreatment(treatmentData: { name: string; description: string }) {
    return this.prisma.treatment.create({
      data: treatmentData,
    });
  }

  async updateTreatment(id: string, treatmentData: { name?: string; description?: string }) {
    return this.prisma.treatment.update({
      where: { id: id },
      data: {
        name: treatmentData.name,
        description: treatmentData.description,
      },
    });
  }

  async createModule(moduleData: { name: string; description: string }) {
    return this.prisma.treatment.create({
      data: moduleData,
    });
  }

  async updateModule(id: string, moduleData: { name?: string; description?: string }) {
    return this.prisma.module.update({
      where: { id: id },
      data: {
        name: moduleData.name,
        description: moduleData.description,
      },
    });
  }

  async updateModulesFromTreatment(treatment_id: string, modules: { id: string; order: number }[]) {
    //disconnect all modules from treatment
    await this.prisma.treatmentModule.deleteMany({
      where: { treatment_id: treatment_id },
    });

    const new_module_data: { treatment_id: string; module_id: string; order: number }[] = modules.map((module) => ({
      treatment_id: treatment_id,
      module_id: module.id, // Map id from modules to module_id
      order: module.order, // Preserve the order from modules
    }));

    //reconnect them in updated form
    return this.prisma.treatmentModule.createMany({
      data: new_module_data,
    });
  }

  async updateActivitiesFromModules(module_id: string, activitiesData: { id?: string; order?: number }[]) {
    // disconnect all activities from module
    await this.prisma.moduleActivity.deleteMany({
      where: { moduleId: module_id },
    });

    const new_activities_data: { activityId: string; moduleId: string; order: number }[] = activitiesData.map((activity) => ({
      activityId: activity.id, // Map id from modules to module_id
      moduleId: module_id,
      order: activity.order, // Preserve the order from modules
    }));

    //reconnect them in updated format
    return this.prisma.moduleActivity.createMany({
      data: new_activities_data,
    });
  }
}
