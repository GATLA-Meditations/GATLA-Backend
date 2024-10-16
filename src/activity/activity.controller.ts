import { Body, Controller, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import { createActivityDto } from './dto/create-activity.dto';
import { ContentDto } from './dto/content.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('activity')
@ApiTags('Activity')
@UseGuards(JwtGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  @HttpCode(200)
  async getActivityById(@Param('id') id: string) {
    return this.activityService.getActivityById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  async createActivity(@Body() data: createActivityDto) {
    return await this.activityService.createActivity(data);
  }

  @Post('/module/:id')
  @UseGuards(AdminGuard)
  @HttpCode(200)
  async createActivityForModuleById(@Param('id') id: string) {
    return await this.activityService.createActivityForModuleById(id);
  }

  @Put('/modify')
  @UseGuards(AdminGuard)
  @HttpCode(200)
  async modifyContent(@Body() data: { content?: ContentDto[]; activity?: { id: string; title: string } }) {
    return this.activityService.modifyContent(data);
  }
}
