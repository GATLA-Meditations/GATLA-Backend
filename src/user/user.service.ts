import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ModuleDto, ModuleType } from '../module/dto/module.dto';
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
    const modules = await this.modules.getActualModuleByUserId(id);
    let actualModule;
    if (modules.length > 1) {
      actualModule = this.selectActualModule(id, modules);
    } else {
      actualModule = modules[0];
    }
    if (actualModule.id === 'tests') {
      return await this.getQuestionnaireModule(id, 'Answer the questionnaires to continue your treatment');
    }
    return modules;
  }

  async subscribeToTreatment(userId: string, treatmentId: string, delayed: boolean = false) {
    const user = await this.repository.getUserById(userId);
    if (user.treatments.find((treatment) => treatment.id === treatmentId)) {
      throw new HttpException('User already subscribed to this treatment', 400);
    }
    const treatment = await this.repository.subscirbeToTreatment(userId, treatmentId);
    await this.modules.createUserModules(userId, treatmentId, delayed);
    return treatment;
  }

  private async getQuestionnaireModule(userId: string, message: string) {
    const treatment = await this.treatment.getActualTreatmentByUserId(userId);
    if (!treatment) {
      throw new HttpException('User is not subscribed to any treatment', 400);
    }
    const questionnaires = await this.parseAnsweredQuestionnaires(userId, treatment.questionnaires);
    return {
      type: ModuleType.QUESTIONNAIRES,
      id: treatment.id,
      name: 'Questionnaires',
      description: message,
      activities: questionnaires,
      progress: null, // TODO: calculate progress
    };
  }
  private async parseAnsweredQuestionnaires(userId: string, questionnaires: { id: string; name: string }[]) {
    const today = new Date();
    const stratDate = new Date(today);
    stratDate.setDate(today.getDate() - 7);
    const questionnaireAnswers = await this.submission.getUserQuestionnaireAnswers(userId, stratDate, today);
    return questionnaires.map((questionnaire) => {
      const answers = questionnaireAnswers.filter((answer) => answer.questionnaireId === questionnaire.id);
      if (answers.length === 0) {
        return { id: questionnaire.id, name: questionnaire.name, answered: false };
      } else {
        return { id: questionnaire.id, name: questionnaire.name, answered: true };
      }
    });
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

  async updateUserRenatokens(userId: string, price: number) {
    return this.repository.updateUserRenatokens(userId, price);
  }

  private selectActualModule(userId: string, modules: ModuleDto[]): ModuleDto {
    modules.forEach(async (module) => {
      if (module.id === 'tests') {
        if (!(await this.checkIfUserHasAnsweredAllQuestions(userId))) return module;
      }
    });
    return modules[0];
  }

  private async checkIfUserHasAnsweredAllQuestions(userId: string): Promise<boolean> {
    const today = new Date();
    const stratDate = new Date(today);
    stratDate.setDate(today.getDate() - 7);
    const userTreatment = await this.treatment.getActualTreatmentByUserId(userId);
    const questionnaires = userTreatment.questionnaires;
    const questionnaireAnswers = await this.submission.getUserQuestionnaireAnswers(userId, stratDate, today);
    questionnaires.forEach((questionnaire) => {
      const answers = questionnaireAnswers.filter((answer) => answer.questionnaireId === questionnaire.id);
      if (answers.length === 0) {
        return false;
      }
    });
    return true;
  }
}
