import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [QuestionnaireController],
  providers: [PrismaClient, QuestionnaireRepository, QuestionnaireService],
})
export class QuestionnaireModule {}
