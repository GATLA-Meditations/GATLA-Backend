import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { SubmissionCreateDto } from './dtos/submission-create.dto';
import { AnswerCreateDto } from './dtos/answer-create.dto';
import { QuestionnaireRepository } from '../questionnaire/questionnaire.repository';
import { InvalidAnwerException } from '../exceptions/invalidAnwerException';
import { QuestionnaireQuestion } from '@prisma/client';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(
    private repository: QuestionnaireSubmissionRepository,
    private questionnaireRepository: QuestionnaireRepository,
  ) {}

  public async createSubmission(submission: SubmissionCreateDto) {
    await this.checkAnswersAreValid(submission.answers);
    return this.repository.createSubmission(submission);
  }

  private async checkAnswersAreValid(
    answers: AnswerCreateDto[],
  ): Promise<boolean> {
    for (const answer of answers) {
      const question = await this.questionnaireRepository.findQuestionById(
        answer.questionId,
      );
      const questionType = question.type;
      this.checkNumericAnswer(questionType, question, answer);
    }
    return true;
  }

  private checkNumericAnswer(
    questionType: 'NUMERIC' | 'SINGLE_CHOICE',
    question: QuestionnaireQuestion,
    answer: AnswerCreateDto,
  ) {
    if (questionType === 'NUMERIC') {
      const metadata = question.metadata;
      const possibleValues = JSON.parse(metadata);
      const max: number = possibleValues.max;
      const min: number = possibleValues.min;
      const numericAnswer = parseInt(answer.answer);
      if (numericAnswer < min || numericAnswer > max) {
        throw new InvalidAnwerException(
          `Answer to question "${question.name}" was outside allowed parameters`,
        );
      }
    }
  }
}
