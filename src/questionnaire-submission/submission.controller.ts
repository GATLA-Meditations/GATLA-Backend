import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmission } from '@prisma/client';
import { SubmissionCreateDto } from './dto/submission-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@ApiTags('Questionnaire Submission')
@Controller('submission')
export class QuestionnaireSubmissionController {
  constructor(private service: QuestionnaireSubmissionService) {}

  @Post('/')
  public async createSubmission(@Request() req: any, @Body() submission: SubmissionCreateDto): Promise<QuestionnaireSubmission> {
    const userId: string = req.user.userId;
    return await this.service.createSubmission(submission, userId);
  }
}
