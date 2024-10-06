import { BadRequestException, Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { QualitativeQuestionService } from './qualitative.question.service';
import { QuestionsDto } from './dto/questions.dto';

@Controller('/qualitative-question')
@UseGuards(JwtGuard)
export class QualitativeQuestionController {
  constructor(private service: QualitativeQuestionService) {}

  @Get('/questions')
  async getQuestions(@Request() req: any): Promise<BadRequestException | QuestionsDto[]> {
    const userId = req.user.id;
    return this.service.getQuestions(userId);
  }

  @Post('/answer/:id')
  async submitAnswer(@Param('id') questionId: string, @Request() req: any, @Body() answer: string) {
    const userId = req.user.id;
    return this.service.submitAnswer(userId, questionId, answer);
  }
}
