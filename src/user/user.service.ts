import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private modules: ModuleService,
  ) {}

  async getActualModule(id: string) {
    return await this.modules.getActualModuleByUserId(id);
  }

  async subscribeToTreatment(userId: string, treatmentId: string) {
    const treatment = await this.repository.subscirbeToTreatment(userId, treatmentId);
    await this.modules.createUserModules(userId, treatmentId);
    return treatment;
  }
}
