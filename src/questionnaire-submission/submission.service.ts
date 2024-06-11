import { Injectable } from '@nestjs/common';
import { QuestionnaireSubmissionRepository } from './submission.repository';
import { SubmissionCreateDto } from './dto/submission-create.dto';
import { AnswerCreateDto } from './dto/answer-create.dto';
import { QuestionnaireRepository } from '../questionnaire/questionnaire.repository';
import { InvalidAnswerException } from '../exceptions/invalidAnswer.exception';
import { InvalidQuestionnaireException } from '../exceptions/invalidQuestionnaire.exception';
import { QuestionnaireQuestion } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class QuestionnaireSubmissionService {
  constructor(
    private repository: QuestionnaireSubmissionRepository,
    private questionnaireRepository: QuestionnaireRepository,
    private httpService: HttpService,
  ) {}

  public async createSubmission(submission: SubmissionCreateDto) {
    await this.checkQuestionnaireExists(submission);
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

  public async sendDataToRedcap(userId: string) {
    const redcapApiUrl = 'https://redcapdemo.vumc.org/api/';
    const redcapApiToken = 'redcap token';
    const data = [
      {
        participant_id: userId,
        test: '2',
        survey_test_complete: '2',
      },
    ];
    try {
      const postData = new URLSearchParams();
      postData.append('token', redcapApiToken);
      postData.append('content', 'record');
      postData.append('format', 'json');
      postData.append('type', 'flat');
      postData.append('data', JSON.stringify(data));

      const response = await this.httpService
        .post(redcapApiUrl, postData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
