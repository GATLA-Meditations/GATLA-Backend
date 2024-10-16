import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma.service';
import { ModuleModule } from '../module/module.module';
import { TreatmentModule } from '../treatment/treatment.module';
import { QuestionnaireSubmissionModule } from '../questionnaire-submission/submission.module';
import { AchievementModule } from 'src/achievement/achievement.module';

@Module({
  imports: [ModuleModule, TreatmentModule, QuestionnaireSubmissionModule, AchievementModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
