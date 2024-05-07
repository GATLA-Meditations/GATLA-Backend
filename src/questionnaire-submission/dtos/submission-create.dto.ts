import { AnswerCreateDto } from './answer-create.dto';

export class SubmissionCreateDto{
  constructor(
    public userId: string,
    public questionnaireId: string,
    public answers: AnswerCreateDto[],
  ) {}
}