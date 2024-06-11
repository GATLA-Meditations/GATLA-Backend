import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { QuestionnaireSubmissionService } from './submission.service';
import { QuestionnaireSubmission } from '@prisma/client';
import { SubmissionCreateDto } from './dto/submission-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('submission')
@ApiTags('Questionnaire Submission')
export class QuestionnaireSubmissionController {
  constructor(private service: QuestionnaireSubmissionService) {}

  @Post('/')
  public async createSubmission(@Body() submission: SubmissionCreateDto): Promise<QuestionnaireSubmission> {
    return await this.service.createSubmission(submission);
  }

  @Post('/redcap')
  @UseGuards(JwtGuard)
  public async sendToRedcap(@Request() req: any) {
    return await this.service.sendDataToRedcap(req.user.userId);
  }
}
