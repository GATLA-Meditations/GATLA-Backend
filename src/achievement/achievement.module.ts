import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { AchievementRepository } from './achievement.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AchievementController],
  providers: [AchievementService, AchievementRepository, PrismaService],
})
export class AchievementModule {}
