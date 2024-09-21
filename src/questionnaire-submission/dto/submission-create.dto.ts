import { AnswerCreateDto } from './answer-create.dto';

export class SubmissionCreateDto {
  questionnaireId: string;
  answers: AnswerCreateDto[];

  constructor(questionnaireId: string, answers: AnswerCreateDto[]) {
    this.questionnaireId = questionnaireId;
    this.answers = answers;
  }
}
