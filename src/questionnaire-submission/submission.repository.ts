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
    const createdSubmission = await this.prisma.questionnaireSubmission.create({
      data: {
        userId: submission.userId,
        questionnaireId: submission.questionnaireId,
      }
    });
    for (const value of submission.answers) {
      await this.prisma.questionnaireAnswer.create({
        data: {
          answer: value.answer,
          questionId: value.questionId,
          questionnaireSubmissionId: createdSubmission.id,
        },
      });
    }
    return this.prisma.questionnaireSubmission.findUnique({
      where: { id: createdSubmission.id },
      include: { answers: true },
    });
  }
}
