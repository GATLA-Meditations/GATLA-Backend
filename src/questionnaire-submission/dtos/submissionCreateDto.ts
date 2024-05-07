import { AnswerCreateDto } from './answerCreateDto';

export class SubmissionCreateDto{
  constructor(
    public userId: string,
    public questionnaireId: string,
    public answers: AnswerCreateDto[],
  ) {}
}