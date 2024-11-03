import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminData } from './dto/AdminData';
import { UpdateAdmin } from './dto/updateAdmin';
import createQuestionnaireDto from './dto/create-questionnaire.dto';
import { ModuleService } from 'src/module/module.service';
import { MailService } from 'src/mail/mail.service';
import { ShopItemType } from '@prisma/client';
import { TreatmentService } from 'src/treatment/treatment.service';
import TreatmentCreateDto, { ContentModifyDto } from 'src/treatment/dto/treatment-create.dto';
import { UserDataDto } from './dto/user-data.dto';
import { NotificationService } from '../notification/notification.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly modules: ModuleService,
    private readonly mailService: MailService,
    private readonly treatmentService: TreatmentService,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {}

  async notifyUser(notificationId: string, userId: string) {
    return await this.notificationService.notifyUser(notificationId, userId);
  }

  async createNotification(notificationData: { title: string; content: string }) {
    return await this.notificationService.createNotification(notificationData);
  }

  async updateQuestionnaire(id: string, questionnaireData: createQuestionnaireDto) {
    const treatments = await this.adminRepository.getQuestionnaireTreatments(id);
    this.disconnectQuestionnaireFromTreatments(id);
    questionnaireData.treatmentId = treatments.treatments.map((treatment) => treatment.id);
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async disconnectQuestionnaireFromTreatments(id: string) {
    return await this.adminRepository.disconnectQuestionnaireFromTreatments(id);
  }

  async createQuestionnaire(questionnaireData: createQuestionnaireDto) {
    return await this.adminRepository.createQuestionnaire(questionnaireData);
  }

  async deleteUser(patient_code: string) {
    console.log(patient_code);
    const user = await this.adminRepository.getUser(patient_code);
    return await this.adminRepository.deleteUser(user.id);
  }

  async createUser(userData: { patient_code: string; password: string; email: string; treatment?: { id: string; delayed: boolean } }) {
    const treatment = userData.treatment;
    const user = await this.authService.registerUser({ patientCode: userData.patient_code, password: userData.password });
    await this.addCommunityFriends(user.id);
    if (treatment != null) {
      await this.adminRepository.subscirbeUsertToTreatment(user.id, treatment.id);
      await this.modules.createUserModules(user.id, treatment.id, treatment.delayed);
    }
    await this.mailService.sendWelcomeEmail(userData.email, 'Credenciales Renacentia', userData.patient_code, userData.password);
    try {
      await this._createUserTables(user.id);
    } catch (e) {
      return e;
    }
    return user;
  }

  private async _createUserTables(userId: string) {
    try {
      await this.adminRepository._addStreakTable(userId);
      await this.adminRepository._addIngameDataTable(userId);
      await this.adminRepository._addNotificationPreferences(userId);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async createAdmin(adminData: AdminData) {
    // Hash the admin password before saving it
    const hashedPassword = await this.hashPassword(adminData.password);

    // Create a new admin object with the hashed password
    const newAdmin = {
      ...adminData,
      password: hashedPassword,
    };

    // Save the admin in the repository
    return await this.adminRepository.createAdmin(newAdmin);
  }

  // Method to hash the password (same as in previous code)
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return await bcrypt.hash(password, saltRounds);
  }

  async updateAdmin(id: string, adminData: UpdateAdmin) {
    return this.adminRepository.updateAdmin(id, adminData);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepository.deleteAdmin(id);
  }

  async createTreatment(treatmentData: TreatmentCreateDto) {
    return await this.treatmentService.createTreatment(treatmentData);
  }

  async updateTreatment(id: string, treatmentData?: { name?: string; description?: string }) {
    return this.adminRepository.updateTreatment(id, treatmentData);
  }

  async addQuestionnaireToTreatment(treatmentId: string, questionnaireId: string) {
    return await this.adminRepository.addQuestionnaireToTreatment(treatmentId, questionnaireId);
  }

  async getModuleById(id: string) {
    return await this.modules.getModuleByIdForAdmin(id);
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

  async createShopItem(shopItemData: { type: ShopItemType; price: number; content_url: string }) {
    return await this.adminRepository.createShopItem(shopItemData);
  }

  async updateContentsInActivity(activityId: string, contents: ContentModifyDto[]) {
    const updatedContents = [];
    for (const content of contents) {
      if (content.id) {
        const updated = await this.adminRepository.updateContentInActivity(content.id, content);
        updatedContents.push(updated);
      } else {
        const newContents = await this.adminRepository.createContentInActivity(activityId, content);
        updatedContents.push(newContents);
      }
    }
    return updatedContents;
  }

  async disconectContentFromActivity(activityId: string, contentId: string) {
    return await this.adminRepository.disconectContentFromActivity(activityId, contentId);
  }

  async createModuleForTreatment(id: string) {
    return await this.treatmentService.createModule(id);
  }

  async getUserById(id: string) {
    const user = await this.adminRepository.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return new UserDataDto(user.id, user.patient_code, user.password, user.treatments);
  }

  async deleteContent(id: string) {
    return await this.adminRepository.deleteContent(id);
  }

  async getUsersPaginated(page: number, size: number, code?: string) {
    if (code == null) {
      return this.adminRepository.getUsersPaginated(page, size);
    }
    return this.adminRepository.getUsersPaginatedWithFilter(page, size, code);
  }

  removeQuestionnaireFromTreatment(treatmentId: string, questionnaireId: string) {
    return this.treatmentService.disconnectQuestionnaireFromTreatment(treatmentId, questionnaireId);
  }

  private async addCommunityFriends(id: string) {
    console.log('Adding friends to user', id);
    const users = await this.adminRepository.getUsers();
    let friends = 0;

    while (friends < 3 && users.length > 0) {
      const randomIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomIndex];

      if (randomUser.id !== id && randomUser.friendsId.length < 3) {
        console.log('Adding friend', randomUser.id);
        await this.adminRepository.addFriend(id, randomUser.id);
        friends++;
      }

      users.splice(randomIndex, 1);
    }
  }
}
