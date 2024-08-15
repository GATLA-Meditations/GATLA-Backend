import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './activity.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository, PrismaService],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
