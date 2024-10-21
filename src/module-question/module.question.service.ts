import { Injectable } from '@nestjs/common';
import { ModuleQuestionRepository } from './module.question.repository';
import { AnswersDto } from './dto/answers.dto';

@Injectable()
export class ModuleQuestionService {
  constructor(private repository: ModuleQuestionRepository) {}

  async getQuestions(userId: string) {
    return this.repository.getQuestions(userId);
  }

  async submitAnswer(userId: string, questionsId: string, answer: string) {
    return this.repository.submitAnswer(userId, questionsId, answer);
  }

  async isTimeForQuestions(userId: string) {
    return await this.repository.isTimeForQuestions(userId);
  }

  async submitAnswers(userId: string, answers: AnswersDto[]) {
    return this.repository.submitAnswers(userId, answers);
  }
}
