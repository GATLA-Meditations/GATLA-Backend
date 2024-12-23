import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRepository } from './module.repository';
import { SimpleActivityDto } from '../activity/dto/simple-activity.dto';
import { ModuleDto, ModuleType } from './dto/module.dto';
import { ContentType } from '@prisma/client';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async getModuleByIdForAdmin(id: string) {
    console.log('id:', id);
    const module = await this.moduleRepository.getModuleById(id);
    console.log('module:', module);
    if (!module) throw new HttpException('Module not found', 404);
    return {
      id: module.id,
      name: module.name,
      description: module.description,
      activities: module.activities.map((activity) => ({
        id: activity.activity.id,
        name: activity.activity.name,
      })),
    };
  }

  async getModuleById(id: string, userId: string) {
    const userModule = await this.moduleRepository.getUserModuleByModuleIdAndUserId(id, userId);
    if (!userModule) throw new HttpException('Module not found', 404);
    return new ModuleDto({
      ...userModule.module,
      activities: this.getSimpleActivityDto(userModule, userModule.lastViewedOrder),
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
          activities: this.getSimpleActivityDto(module, module.lastViewedOrder),
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
    date.setUTCHours(0, 0, 0, 0);
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

  async updateViewTime(userId: string, time: number, activityId: string) {
    const date = new Date();

    const userModules = await this.moduleRepository.getUserMinutesSpent(userId);
    const meditationModule = userModules.find((module) => module.moduleId != 'dummy' && module.moduleId != 'tests');

    if (!meditationModule) return;

    const isVideoMeditation = await this.checkIfVideoIsMeditation(activityId, meditationModule);

    if (!isVideoMeditation) {
      await this.checkIfUnlockNextActivity(activityId, meditationModule);
      return;
    }

    await this.updateTotalViewTime(userId, time);
    const minutesSpent = meditationModule.minutesSpent;
    const actualMinutesModule = minutesSpent.find((item) => item.createdAt.getDay === date.getDay);

    if (!actualMinutesModule) {
      return this.moduleRepository.createUserMinutesSpent(meditationModule.moduleId, time);
    } else {
      const addedTime: number = Number(actualMinutesModule.minutesSpent) + Number(time);
      return this.moduleRepository.updateUserMinutesSpent(actualMinutesModule.id, addedTime);
    }
  }

  async updateTotalViewTime(userId: string, time: number) {
    await this.moduleRepository.updateMaxMinutesSpent(userId, time);
  }

  async checkIfUnlockNextActivity(activityId: string, meditationModule) {
    const module = await this.moduleRepository.getModuleById(meditationModule.moduleId);
    const activity = module.activities.find((activity) => activity.activityId === activityId);
    if (activity.order >= meditationModule.lastViewedOrder) {
      await this.moduleRepository.unlockNextActivity(meditationModule.id, meditationModule.lastViewedOrder + 1);
    }
  }

  private async checkIfVideoIsMeditation(activityId: string, userModule: any) {
    const module = await this.moduleRepository.getModuleById(userModule.moduleId);
    const activity = module.activities.find((activity) => activity.activityId === activityId);
    if (activity.order > userModule.lastViewedOrder) {
      throw new HttpException('Activity not unlocked', 400);
    }
    const videoType = this.findType(activity.activity.contents);
    return videoType === ContentType.MED_VIDEO;
  }

  private findType(contents): ContentType {
    console.log('contents:', contents);
    return contents.find((content) => content.content.type === ContentType.MED_INTRO || content.content.type === ContentType.MED_VIDEO)
      .content.type;
  }

  async getViewTime(id: string) {
    const modules = await this.moduleRepository.getUserMinutesSpent(id);
    let time = 0;
    modules.forEach((module) => {
      module.minutesSpent.forEach((minutes) => {
        time += minutes.minutesSpent;
      });
    });
    return time;
  }

  async getUserIngameData(id: string) {
    return await this.moduleRepository.getUserIngameData(id);
  }

  async getUserModuleMinutesSpent(id: string) {
    return await this.moduleRepository.getUserMinutesSpent(id);
  }

  private getSimpleActivityDto(userModule: any, order: number) {
    return userModule.module.activities.map((activity) => {
      return new SimpleActivityDto({
        id: activity.activityId,
        name: activity.activity.name,
        unlocked: activity.order <= order,
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

  async deleteModule(id: string) {
    const activities = await this.moduleRepository.getActivitiesByModuleId(id);
    for (const activity of activities) {
      await this.moduleRepository.disconnectActivityFromModuleAndDeleteIfEmpty(activity.id);
    }
    return await this.moduleRepository.deleteModule(id);
  }
}
