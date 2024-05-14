import { AnswerCreateDto } from './answer-create.dto';

export class SubmissionCreateDto {
  userId: string;
  questionnaireId: string;
  answers: AnswerCreateDto[];

  constructor(
    userId: string,
    questionnaireId: string,
    answers: AnswerCreateDto[],
  ) {
    this.userId = userId;
    this.questionnaireId = questionnaireId;
    this.answers = answers;
  }
}
