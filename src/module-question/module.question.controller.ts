import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ModuleQuestionService } from './module.question.service';
import { QuestionsDto } from './dto/questions.dto';
import { AnswersDto } from './dto/answers.dto';

@Controller('/module-question')
@UseGuards(JwtGuard)
export class ModuleQuestionController {
  constructor(private service: ModuleQuestionService) {}

  @Get('/isTime')
  async isTime(@Request() req: any) {
    const userId = req.user.id;
    return this.service.isTimeForQuestions(userId);
  }

  @Get('/questions')
  async getQuestions(@Request() req: any): Promise<BadRequestException | QuestionsDto[]> {
    const userId = req.user.id;
    return this.service.getQuestions(userId);
  }

  @Post('/answers')
  @HttpCode(HttpStatus.CREATED)
  async submitAnswers(@Request() req: any, @Body() answers: AnswersDto[]) {
    const userId = req.user.id;
    return await this.service.submitAnswers(userId, answers);
  }

  @Post('/answer/:id')
  async submitAnswer(@Param('id') questionId: string, @Request() req: any, @Body() answer: string) {
    const userId = req.user.id;
    return this.service.submitAnswer(userId, questionId, answer);
  }
}
