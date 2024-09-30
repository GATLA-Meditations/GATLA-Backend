import { Injectable } from '@nestjs/common';
import { QualitativeQuestionRepository } from './qualitative.question.repository';

@Injectable()
export class QualitativeQuestionService {
  constructor(private repository: QualitativeQuestionRepository) {}

  async getQuestions(userId: string) {
    return this.repository.getQuestions(userId);
  }

  async submitAnswer(userId: string, questionsId: string, answer: string) {
    return this.repository.submitAnswer(userId, questionsId, answer);
  }
}
