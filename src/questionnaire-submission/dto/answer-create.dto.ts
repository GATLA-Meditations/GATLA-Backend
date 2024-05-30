export class AnswerCreateDto {
  answer: string;
  questionId: string;

  constructor(answer: string, questionId: string) {
    this.answer = answer;
    this.questionId = questionId;
  }
}
