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

  public async createSubmission(submission: SubmissionCreateDto) {
    await this.checkQuestionnaireExists(submission);
    this.treatmentQuestionnaireAnswered(submission.userId); // no le pongo el await porque es un chequeo que no afecta a la ejecucion actual
    return this.repository.createSubmission(submission);
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
        if (question.id === response.questionId) return question;
      });
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

  async treatmentQuestionnaireAnswered(userId: string) {
    let endQuestionnaires = true;
    const userTreatment = await this.treatment.getUserTreatment(userId);
    const treatment = await this.treatment.getActualTreatmentByUserId(userId);
    for (const questionnaire of treatment.questionnaires) {
      const submissions = await this.repository.findByUserAndQuestionnaire(userId, questionnaire.id);
      if (!submissions) return false;
      if (submissions.length < 2) endQuestionnaires = false;
    }
    if (!userTreatment.startAnswer) return await this.treatment.updateStartQuestionnaireAnswers(userTreatment.id);
    if (endQuestionnaires && !userTreatment.endAnswer) return await this.treatment.updateEndQuestionnaireAnswers(userTreatment.id);
  }

  async getUserQuestionnaireAnswers(userId, startDate, endDate) {
    return this.repository.getUserQuestionnaireSubmissions(userId, startDate, endDate);
  }
}
