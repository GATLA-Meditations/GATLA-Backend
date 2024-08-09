import { Body, Controller, Get, HttpCode, Param, Post, Put, Request } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import { createActivityDto } from './dto/create-activity.dto';
import { ContentDto } from './dto/content.dto';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  @HttpCode(200)
  async getActivityById(@Param('id') id: string) {
    return this.activityService.getActivityById(id);
  }

  @Post()
  async createActivity(@Body() data: createActivityDto, @Request() req: any) {
    return await this.activityService.createActivity(req.user.id, data);
  }

  @Put('/modify-content')
  async modifyContent(@Body() data: ContentDto, @Request() req: any) {
    return this.activityService.modifyContent(req.user.id, data);
  }
}
