import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ModuleType } from '../module/dto/module.dto';
import { TreatmentService } from '../treatment/treatment.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private modules: ModuleService,
    private treatment: TreatmentService,
  ) {}

  async getActualModule(id: string) {
    const treatmentTests = await this.repository.getUserTests(id);
    if (!treatmentTests.startAnswer) {
      return this.getQuestionnaireModule(id, 'Answer the questionnaires to start your treatment');
    }
    const actualModule = await this.modules.getActualModuleByUserId(id);
    if (!actualModule && !treatmentTests.endAnswer) {
      return this.getQuestionnaireModule(id, 'Answer the questionnaires to finish your treatment');
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

  private async getQuestionnaireModule(userId: string, message: string) {
    const treatment = await this.treatment.getActualTreatmentByUserId(userId);
    if (!treatment) {
      throw new HttpException('User is not subscribed to any treatment', 400);
    }
    return {
      type: ModuleType.QUESTIONNAIRES,
      id: treatment.id,
      name: 'Questionnaires',
      description: message,
      activities: treatment.questionnaires,
      progress: null, // TODO: calculate progress
    };
  }
}
