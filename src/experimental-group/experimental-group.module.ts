import { Module } from '@nestjs/common';
import { ExperimentalGroupController } from './experimental-group.controller';
import { ExperimentalGroupService } from './experimental-group.service';
import { ExperimentalGroupRepository } from './experimental-group.repository';
import { QuestionnaireSchedulerService } from './questionnaire-scheduler.service';
import { PrismaService } from '../prisma.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [ExperimentalGroupController],
  providers: [ExperimentalGroupService, ExperimentalGroupRepository, QuestionnaireSchedulerService, PrismaService],
  exports: [ExperimentalGroupService],
})
export class ExperimentalGroupModule {}
