import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ModuleType } from '../module/dto/module.dto';
import { TreatmentService } from '../treatment/treatment.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { QuestionnaireSubmissionService } from '../questionnaire-submission/submission.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private modules: ModuleService,
    private treatment: TreatmentService,
    private submission: QuestionnaireSubmissionService,
  ) {}

  async getActualModule(id: string) {
    const treatmentTests = await this.repository.getUserTests(id);
    if (!treatmentTests.startAnswer) {
      return await this.getQuestionnaireModule(id, 'Answer the questionnaires to start your treatment');
    }
    const actualModule = await this.modules.getActualModuleByUserId(id);
    if (!actualModule && !treatmentTests.endAnswer) {
      return await this.getQuestionnaireModule(id, 'Answer the questionnaires to finish your treatment', false);
    }
    return actualModule;
  }

  async subscribeToTreatment(userId: string, treatmentId: string) {
    const user = await this.repository.getUserById(userId);
    if (user.treatments.find((treatment) => treatment.id === treatmentId)) {
      throw new HttpException('User already subscribed to this treatment', 400);
    }
    const treatment = await this.repository.subscirbeToTreatment(userId, treatmentId);
    await this.modules.createUserModules(userId, treatmentId);
    return treatment;
  }

  private async getQuestionnaireModule(userId: string, message: string, startQuestionnaire: boolean = true) {
    let activities;
    if (startQuestionnaire) activities = await this.submission.checkStartQuestionnaireAnswers(userId);
    else activities = await this.submission.checkEndQuestionnaireAnswers(userId);
    const treatment = await this.treatment.getActualTreatmentByUserId(userId);
    if (!treatment) {
      throw new HttpException('User is not subscribed to any treatment', 400);
    }
    return {
      type: ModuleType.QUESTIONNAIRES,
      id: treatment.id,
      name: 'Questionnaires',
      description: message,
      activities: activities,
      progress: null, // TODO: calculate progress
    };
  }

  async getUserIngameData(id: string) {
    return await this.modules.getUserIngameData(id);
  }

  async changeUserPassword(id: string, password: ChangePasswordDto) {
    return await this.repository.changeUserPassword(id, password.password);
  }

  async getUserProfile(id: string) {
    const user = await this.repository.getUserProfile(id);
    if (!user) throw new HttpException('User not found', 404);
    return new UserProfileDto(
      user.patient_code,
      user.image,
      user.achievements.map((a) => ({
        title: a.Achievement.title,
        description: a.Achievement.unlockedDescription,
        image: a.Achievement.unlockedImage,
      })),
    );
  }

  async getUserItems(id: string) {
    return await this.repository.getUserItems(id);
  }

  async getUserRenatokens(id: string) {
    return await this.repository.getUserRenatokens(id);
  }

  updateUserRenatokens(userId: string, price: number) {
    return this.repository.updateUserRenatokens(userId, price);
  }
}
