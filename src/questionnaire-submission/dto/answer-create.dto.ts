export class AnswerCreateDto {
  answer: string;
  id: string;

  constructor(answer: string, id: string) {
    this.answer = answer;
    this.id = id;
  }
}
