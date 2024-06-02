import { Body, Controller, Post } from '@nestjs/common';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmission } from '@prisma/client';
import { SubmissionCreateDto } from './dto/submission-create.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('submission')
@ApiTags('Questionnaire Submission')
export class QuestionnaireSubmissionController {
  constructor(private service: QuestionnaireSubmissionService) {}

  @Post('/')
  public async createSubmission(@Body() submission: SubmissionCreateDto): Promise<QuestionnaireSubmission> {
    return await this.service.createSubmission(submission);
  }
}
