import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':id')
  @HttpCode(200)
  async getModuleById(@Param('id') id: string) {
    return this.moduleService.getModuleById(id);
  }
}
