import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  @HttpCode(200)
  async getActivityById(@Param('id') id: string) {
    return this.activityService.getActivityById(id)
  }
}
