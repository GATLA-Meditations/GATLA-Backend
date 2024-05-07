import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { SubmissionCreateDto } from './dtos/submission-create.dto';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(private repository: QuestionnaireSubmissionRepository) {}

  public createSubmission(submission: SubmissionCreateDto) {
    return this.repository.createSubmission(submission);
  }
}
