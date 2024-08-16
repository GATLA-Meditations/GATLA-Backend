import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuestionnaireSubmissionController } from './submission.controller';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { TreatmentModule } from '../treatment/treatment.module';

@Module({
  imports: [QuestionnaireModule, TreatmentModule],
  controllers: [QuestionnaireSubmissionController],
  providers: [PrismaService, QuestionnaireSubmissionService, QuestionnaireSubmissionRepository],
  exports: [QuestionnaireSubmissionService],
})
export class QuestionnaireSubmissionModule {}
