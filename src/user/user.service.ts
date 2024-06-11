import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private modules: ModuleService,
  ) {}

  async getActualModule(id: string) {
    return await this.modules.getActualModuleByUserId(id);
  }

  async getUserIngameData(id: string) {
    return await this.modules.getUserIngameData(id);
  }

  async changeUserPassword(id: string, password: ChangePasswordDto) {
    return await this.repository.changeUserPassword(id, password.password);
  }
}
