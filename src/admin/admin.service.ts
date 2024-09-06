import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';
import createQuestionnaireDto from './dto/create-questionnaire.dto';
import { ModuleService } from 'src/module/module.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly modules: ModuleService,
  ) {}

  async notifyUser(notificationId: string, userId: string) {
    return await this.adminRepository.notifyUser(notificationId, userId);
  }

  async createNotification(notificationData: { title: string; content: string }) {
    return await this.adminRepository.createNotification(notificationData);
  }

  async updateQuestionnaire(id: string, questionnaireData: createQuestionnaireDto) {
    const treatments = await this.adminRepository.getQuestionnaireTreatments(id);
    this.disconnectQuestionnaireFromTreatment(id);
    questionnaireData.treatmentId = treatments.treatments.map((treatment) => treatment.id);
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async disconnectQuestionnaireFromTreatment(id: string) {
    return await this.adminRepository.disconnectQuestionnaireFromTreatment(id);
  }

  async createQuestionnaire(questionnaireData: createQuestionnaireDto) {
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async deleteUser(patient_code: string) {
    console.log(patient_code);
    const user = await this.adminRepository.getUser(patient_code);
    return await this.adminRepository.deleteUser(user.id);
  }

  async createUser(userData: { patient_code: string; password: string; treatment?: { id: string; delayed: boolean } }) {
    const treatment = userData.treatment;
    const user = await this.adminRepository.createUser(userData.patient_code, userData.password);
    if (treatment != null) {
      await this.adminRepository.subscirbeUsertToTreatment(user.id, treatment.id);
      await this.modules.createUserModules(user.id, treatment.id, treatment.delayed);
    }
    return user;
  }

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
