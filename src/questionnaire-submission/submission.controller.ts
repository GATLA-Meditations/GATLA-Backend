import { Body, Controller, Post } from '@nestjs/common';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmission } from '@prisma/client';
import { SubmissionCreateDto } from './dtos/submissionCreateDto';

@Controller('submission')
export class QuestionnaireSubmissionController {
  constructor(private service: QuestionnaireSubmissionService) {}

  @Post('/')
  public async createSubmission(
    @Body() submission: SubmissionCreateDto,
  ): Promise<QuestionnaireSubmission> {
    return await this.service.createSubimssion(submission);
  }
}
