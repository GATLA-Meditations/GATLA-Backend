import { IsNotEmpty } from 'class-validator';

export class AnswersDto {
  @IsNotEmpty()
  readonly id: string;
  readonly answer: string;

  constructor(id: string, answer: string) {
    this.id = id;
    this.answer = answer;
  }
}
