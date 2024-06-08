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
      progress: this.calculateProgress(userModule),
    });
  }

  async getActualModuleByUserId(userId: string) {
    const actualModule = await this.moduleRepository.findActualModuleFromUser(userId);
    const userModule = await this.moduleRepository.getUserModuleByModuleIdAndUserId(actualModule.moduleId, userId);
    const activities = this.getSimpleActivityDto(userModule);
    return new ModuleDto({
      ...userModule.module,
      activities,
      progress: this.calculateProgress(userModule),
    });
  }

  private getSimpleActivityDto(userModule: any) {
    return userModule.module.activities.map((activity, index) => {
      if (index === 0)
        return new SimpleActivityDto({
          id: activity.activityId,
          name: activity.activity.name,
          unlocked: true,
        });
      if (index === 1)
        return new SimpleActivityDto({
          id: activity.activityId,
          name: activity.activity.name,
          unlocked: userModule.medIntroduction,
        });
      return new SimpleActivityDto({
        id: activity.activityId,
        name: activity.activity.name,
        unlocked: userModule.weekIntroduction && userModule.medIntroduction,
      });
    });
  }

  private calculateProgress(userModule: any) {
    let counter = 0;
    const total = 9;
    if (userModule.medIntroduction) counter++;
    if (userModule.weekIntroduction) counter++;
    for (const activity of userModule.minutesSpent) {
      if (activity.minutesSpent >= 5) counter++;
    }
    return Math.round((counter / total) * 100);
  }
}
