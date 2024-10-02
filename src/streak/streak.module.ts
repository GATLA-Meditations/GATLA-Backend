import { Module } from '@nestjs/common';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';
import { StreakRespository } from './streak.respository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [StreakController],
  providers: [StreakService, StreakRespository, PrismaService],
  exports: [StreakService, StreakRespository],
})
export class StreakModule {}
