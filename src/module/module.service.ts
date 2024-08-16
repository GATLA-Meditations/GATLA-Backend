import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRepository } from './module.repository';
import { SimpleActivityDto } from '../activity/dto/simple-activity.dto';
import { ModuleDto, ModuleType } from './dto/module.dto';

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
      type: ModuleType.MEDITATION,
    });
  }
  
  async getActualModuleByUserId(userId: string) {
    const actualModule = await this.moduleRepository.findActualModuleFromUser(userId);
    if (!actualModule) return null;
    const modules = [];
    for (const module of actualModule) {
      modules.push(
        new ModuleDto({
          ...module.module,
          activities: this.getSimpleActivityDto(module),
          progress: this.calculateProgress(module),
          type: module.module.id === 'tests' ? ModuleType.QUESTIONNAIRES : ModuleType.MEDITATION,
        }),
      );
    }
    return modules;
  }

  async createUserModules(userId: string, treatmentId: string, delayed: boolean = false) {
    const modules = await this.moduleRepository.getModulesByTreatmentId(treatmentId);
    let date = new Date();
    this.createTestModule(userId, date);
    if (delayed) {
      for (let _ of modules) {
        _ = _; // ? me tira unused vars sino y con el foreach no andan bien las dates
        await this.subscribeToDummyModule(userId, date);
        date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7, 0, 0, 0);
      }
      this.createTestModule(userId, date);
    }
    for (const module of modules) {
      await this.moduleRepository.createUserModule(userId, module.module.id, date);
      date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 7, 0, 0, 0);
    }
    this.createTestModule(userId, date);
  }
  
  async updateViewTime(userId: string, time: number) {
    const date = new Date();
    const userModules = await this.moduleRepository.getUserMinutesSpent(userId);
    const meditationModule = userModules.find((module) => module.moduleId != 'dummy' && module.moduleId != 'tests');
    if (!meditationModule) return;
    const minutesSpent = meditationModule.minutesSpent;
    const actualMiuntesModule = minutesSpent.find((item) => item.createdAt.getDay === date.getDay);
    if (!actualMiuntesModule) {
      return await this.moduleRepository.createUserMinutesSpent(meditationModule.moduleId, time);
    }
    else{
      const addedTime = actualMiuntesModule.minutesSpent + time;
      return await this.moduleRepository.updateUserMinutesSpent(actualMiuntesModule.id, addedTime);
    }
  }

  async getUserIngameData(id: string) {
    return await this.moduleRepository.getUserIngameData(id);
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
  
  private async subscribeToDummyModule(userId: string, startDate: Date) {
    await this.moduleRepository.createUserModule(userId, 'dummy', startDate);
  }
  
  private async createTestModule(userId: string, date: Date) {
    await this.moduleRepository.createUserModule(userId, 'tests', date);
  }
}
