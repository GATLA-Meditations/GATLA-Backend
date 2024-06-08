import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ModuleType } from '../module/dto/module.dto';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private modules: ModuleService,
  ) {}

  async getActualModule(id: string) {
    const treatmentTests = await this.repository.getUserTests(id);
    if (!treatmentTests.startAnswer) {
      return {
        type: ModuleType.QUESTIONNAIRES,
        id: treatmentTests.id,
        name: 'Questionnaires',
        description: 'Answer the questionnaires to start your treatment',
        activities: treatmentTests.questionnaires,
        progress: 0, // TODO: calculate progress
      };
    }
    const actualModule = await this.modules.getActualModuleByUserId(id);
    if (!actualModule && !treatmentTests.endAnswer) {
      return {
        type: ModuleType.QUESTIONNAIRES,
        id: treatmentTests.id,
        name: 'Questionnaires',
        description: 'Answer the questionnaires to finish your treatment',
        activities: treatmentTests.questionnaires,
        progress: 100, // TODO: calculate progress
      };
    }
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
}
