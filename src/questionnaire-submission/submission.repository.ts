import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmission } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { SubmissionCreateDto } from './dtos/submission-create.dto';

@Injectable()
export class QuestionnaireSubmissionRepository {
  constructor(private prisma: PrismaService) {}

  public async createSubmission(
    submission: SubmissionCreateDto,
  ): Promise<QuestionnaireSubmission> {
    return this.prisma.questionnaireSubmission.create({
      data: {
        userId: submission.userId,
        questionnaireId: submission.questionnaireId,
        answers: {
          create: submission.answers.map((answer) => ({
            answer: answer.answer,
            questionId: answer.questionId,
          })),
        },
      },
      include: {
        answers: true,
      },
    });
  }
}
