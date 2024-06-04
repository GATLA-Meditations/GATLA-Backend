import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AchievementService } from './achievement.service';

@Controller('achievement')
@ApiTags('Achievement')
@UseGuards(JwtGuard)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get(':id')
  @HttpCode(200)
  async getModuleById(@Param('id') id: string) {
    return this.achievementService.getAchievementById(id);
  }
}
