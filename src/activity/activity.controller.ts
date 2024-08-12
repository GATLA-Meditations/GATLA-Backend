import { Body, Controller, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import { createActivityDto } from './dto/create-activity.dto';
import { ContentDto } from './dto/content.dto';
import { AdminGuard } from '../auth/guards/admin.guard';

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
  @UseGuards(AdminGuard)
  async createActivity(@Body() data: createActivityDto, @Request() req: any) {
    return await this.activityService.createActivity(req.user.id, data);
  }

  @Put('/modify-content')
  @UseGuards(AdminGuard)
  async modifyContent(@Body() data: ContentDto, @Request() req: any) {
    return this.activityService.modifyContent(req.user.id, data);
  }
}
