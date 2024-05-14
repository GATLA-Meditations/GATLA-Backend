import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuestionnaireSubmissionController } from './submission.controller';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';

@Module({
  imports: [QuestionnaireModule],
  controllers: [QuestionnaireSubmissionController],
  providers: [
    PrismaService,
    QuestionnaireSubmissionService,
    QuestionnaireSubmissionRepository,
  ],
})
export class QuestionnaireSubmissionModule {}
