import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRepository } from './module.repository';
import { SimpleActivityDto } from '../activity/dto/simple-activity.dto';
import { ModuleDto } from './dto/module.dto';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async getModuleById(id: string, userId: string) {
    const userModule = await this.moduleRepository.getUserModuleByModuleIdAndUserId(id, userId);
    if (!userModule) throw new HttpException('Module not found', 404);
    return new ModuleDto({
      ...userModule.module,
      activities: this.getSimpleActivityDto(userModule),
    });
  }

  async getActualModuleByUserId(userId: string) {
    return await this.moduleRepository.getActualModule(userId);
  }

  private getSimpleActivityDto(userModule: any) {
    return userModule.module.activities.map((activity, index) => {
      if (index === 0)
        return new SimpleActivityDto({
          ...activity,
          unlocked: true,
        });
      if (index === 1)
        return new SimpleActivityDto({
          ...activity,
          unlocked: userModule.medIntroduction,
        });
      return new SimpleActivityDto({
        ...activity,
        unlocked: userModule.weekIntroduction && userModule.medIntroduction,
      });
    });
  }
}
