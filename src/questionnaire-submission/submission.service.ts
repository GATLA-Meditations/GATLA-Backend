import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { QuestionnaireSubmission } from '@prisma/client';
import { SubmissionCreateDto } from './dtos/submissionCreateDto';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(private repository: QuestionnaireSubmissionRepository) {}

  public createSubmission(submission: SubmissionCreateDto) {
    return this.repository.createSubmission(submission);
  }
}
