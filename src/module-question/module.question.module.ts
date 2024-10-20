import { Module } from '@nestjs/common';
import { ModuleQuestionController } from './module.question.controller';
import { PrismaService } from '../prisma.service';
import { ModuleQuestionRepository } from './module.question.repository';
import { ModuleQuestionService } from './module.question.service';

@Module({
  controllers: [ModuleQuestionController],
  providers: [PrismaService, ModuleQuestionRepository, ModuleQuestionService],
})
export class ModuleQuestionModule {}
