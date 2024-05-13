import { Questionnaire, QuestionnaireQuestion } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionnaireRepository {
  constructor(private prisma: PrismaService) {}

  async createQuestionnaire(
    questionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return this.prisma.questionnaire.create({
      data: questionnaire,
    });
  }

  async findById(id: string) {
    return this.prisma.questionnaire.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  async findQuestionById(id: string): Promise<QuestionnaireQuestion> {
    return this.prisma.questionnaireQuestion.findUnique({
      where: { id },
    });
  }
}
