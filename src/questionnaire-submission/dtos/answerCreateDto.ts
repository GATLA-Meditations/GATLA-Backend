export class AnswerCreateDto{
  constructor(
    public answer: string,
    public questionId: string,
  ) {}
}
