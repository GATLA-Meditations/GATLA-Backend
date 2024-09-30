import { Module } from '@nestjs/common';
import { QualitativeQuestionController } from './qualitative.question.controller';
import { PrismaService } from '../prisma.service';
import { QualitativeQuestionRepository } from './qualitative.question.repository';
import { QualitativeQuestionService } from './qualitative.question.service';

@Module({
  controllers: [QualitativeQuestionController],
  providers: [PrismaService, QualitativeQuestionRepository, QualitativeQuestionService],
})
export class QualitativeQuestionModule {}
