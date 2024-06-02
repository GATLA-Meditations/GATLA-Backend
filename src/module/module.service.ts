import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRepository } from './module.repository';
import { ModuleDto } from './dto/module.dto';
import { SimpleActivityDto } from '../activity/dto/simple-activity.dto';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async getModuleById(id: string) {
    const module = await this.moduleRepository.getModuleById(id);
    if (!module) throw new HttpException('Module not found', 404);
    return new ModuleDto({
      ...module,
      activities: module.activities.map(
        (moduleActivity) => new SimpleActivityDto(moduleActivity.activity),
      ),
    });
  }

  async getActualModuleByUserId(userId: string) {
    return await this.moduleRepository.getActualModule(userId);
  }
}
