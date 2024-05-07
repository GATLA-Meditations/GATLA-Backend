import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QuestionnaireController],
  providers: [PrismaService, QuestionnaireRepository, QuestionnaireService],
})
export class QuestionnaireModule {}
