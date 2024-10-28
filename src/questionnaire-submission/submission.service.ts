import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { SubmissionCreateDto } from './dto/submission-create.dto';
import { AnswerCreateDto } from './dto/answer-create.dto';
import { QuestionnaireRepository } from '../questionnaire/questionnaire.repository';
import { InvalidAnswerException } from '../exceptions/invalidAnswer.exception';
import { InvalidQuestionnaireException } from '../exceptions/invalidQuestionnaire.exception';
import { QuestionnaireQuestion } from '@prisma/client';
import { TreatmentService } from '../treatment/treatment.service';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(
    private repository: QuestionnaireSubmissionRepository,
    private questionnaireRepository: QuestionnaireRepository,
    private treatment: TreatmentService,
  ) {}

  public async createSubmission(submission: SubmissionCreateDto, userId: string) {
    await this.checkQuestionnaireExists(submission);
    const onlyAnswers = submission.answers.map((answer) => {
      return { id: answer.id, answer: !answer.answer ? 'n/a' : answer.answer };
    });
    const updatedSubmission = { ...submission, answers: onlyAnswers };
    return this.repository.createSubmission(updatedSubmission, userId);
  }

  private async checkQuestionnaireExists(submission: SubmissionCreateDto): Promise<boolean> {
    const questionnaire = await this.questionnaireRepository.findById(submission.questionnaireId);
    if (!questionnaire) {
      throw new InvalidQuestionnaireException(`Questionnaire with id: ${submission.questionnaireId} does not exist`);
    }
    return this.checkAnswersAreValid(submission.answers, questionnaire);
  }

  private async checkAnswersAreValid(answers: AnswerCreateDto[], questionnaire): Promise<boolean> {
    answers.map((response) => {
      const question = questionnaire.questions.find((question) => {
        if (question.id === response.id) return question;
      });
      if (!response.answer) return;
      if (!question) throw new InvalidAnswerException(`Question with id: ${response.id} does not exist`);
      if (question.type == 'NUMERIC') this.checkNumericAnswer(question, response);
    });
    return true;
  }

  private checkNumericAnswer(question: QuestionnaireQuestion, answer: AnswerCreateDto) {
    const metadata = question.metadata;
    const possibleValues = JSON.parse(metadata);
    const max: number = possibleValues.max;
    const min: number = possibleValues.min;
    const numericAnswer: number = Number(answer.answer);
    if (isNaN(numericAnswer)) throw new InvalidAnswerException(`Answer to question "${question.name}" should be a number`);
    if (numericAnswer < min || numericAnswer > max) {
      throw new InvalidAnswerException(`Answer to question "${question.name}" was outside allowed parameters`);
    }
  }

  async getUserQuestionnaireAnswers(userId, startDate, endDate) {
    return this.repository.getUserQuestionnaireSubmissions(userId, startDate, endDate);
  }
}
