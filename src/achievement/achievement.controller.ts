import { Controller, Get, HttpCode, Param, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AchievementService } from './achievement.service';

@Controller('achievement')
@ApiTags('Achievement')
@UseGuards(JwtGuard)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get('user')
  @HttpCode(200)
  async getAchievementByUserId(@Request() req: any) {
    return await this.achievementService.getAchievementByUserId(req.user.id);
  }

  @Get('all')
  @HttpCode(200)
  async getAllAchievements() {
    return await this.achievementService.getAllAchievements();
  }

  @Get(':id')
  @HttpCode(200)
  async getAchievementById(@Param('id') id: string) {
    return await this.achievementService.getAchievementById(id);
  }
}
