import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  @HttpCode(200)
  async getActivityById(@Param('id') id: string) {
    return this.activityService.getActivityById(id);
  }
}
