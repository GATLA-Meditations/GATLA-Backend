import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { SubmissionCreateDto } from './dtos/submission-create.dto';
import { AnswerCreateDto } from './dtos/answer-create.dto';
import { QuestionnaireRepository } from '../questionnaire/questionnaire.repository';
import { InvalidAnswerException } from '../exceptions/invalidAnswer.exception';
import { InvalidQuestionnaireException } from '../exceptions/invalidQuestionnaire.exception';
import { QuestionnaireQuestion } from '@prisma/client';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(
    private repository: QuestionnaireSubmissionRepository,
    private questionnaireRepository: QuestionnaireRepository,
  ) {}

  public async createSubmission(submission: SubmissionCreateDto) {
    await this.checkQuestionnaireExists(submission);
    return this.repository.createSubmission(submission);
  }

  private async checkQuestionnaireExists(
    submission: SubmissionCreateDto,
  ): Promise<boolean> {
    const questionnaire = await this.questionnaireRepository.findById(
      submission.questionnaireId,
    );
    if (!questionnaire) {
      throw new InvalidQuestionnaireException(
        `Questionnaire with id: ${submission.questionnaireId} does not exist`,
      );
    }
    return this.checkAnswersAreValid(submission.answers, questionnaire);
  }

  private async checkAnswersAreValid(
    answers: AnswerCreateDto[],
    questionnaire,
  ): Promise<boolean> {
    answers.map((response) => {
      const question = questionnaire.questions.find((question) => {
        if (question.id === response.questionId) return question;
      });
      if (question.type == 'NUMERIC')
        this.checkNumericAnswer(question, response);
    });
    return true;
  }

  private checkNumericAnswer(
    question: QuestionnaireQuestion,
    answer: AnswerCreateDto,
  ) {
    const metadata = question.metadata;
    const possibleValues = JSON.parse(metadata);
    const max: number = possibleValues.max;
    const min: number = possibleValues.min;
    const numericAnswer: number = Number(answer.answer);
    if (isNaN(numericAnswer))
      throw new InvalidAnswerException(
        `Answer to question "${question.name}" should be a number`,
      );
    if (numericAnswer < min || numericAnswer > max) {
      throw new InvalidAnswerException(
        `Answer to question "${question.name}" was outside allowed parameters`,
      );
    }
  }
}
