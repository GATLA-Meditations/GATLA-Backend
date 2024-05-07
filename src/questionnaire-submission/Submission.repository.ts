import { Injectable } from '@nestjs/common';
import { PrismaClient, QuestionnaireSubmission } from '@prisma/client';

@Injectable()
export class SubmissionRepository {
  constructor(private prisma: PrismaClient) {}

  public createSubmission(
    submission: QuestionnaireSubmission,
  ): Promise<QuestionnaireSubmission> {
    return this.prisma.questionnaireSubmission.create({ data: submission });
  }
}
