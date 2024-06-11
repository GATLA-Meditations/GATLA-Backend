import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModuleService } from '../module/module.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserProfileDto } from './dto/user-profile.dto';

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

  async getUserProfile(id: string) {
    const user = await this.repository.getUserProfile(id);
    if (!user) throw new HttpException('User not found', 404);
    return new UserProfileDto(
      user.patient_code,
      user.image,
      user.achievements.map((a) => ({
        title: a.Achievement.title,
        description: a.Achievement.description,
        image: a.Achievement.image,
      })),
    );
  }
}
