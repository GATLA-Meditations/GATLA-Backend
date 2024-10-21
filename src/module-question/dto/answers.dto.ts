import { IsNotEmpty } from 'class-validator';

export class AnswersDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly answer: string;

  constructor(id: string, answer: string) {
    this.id = id;
    this.answer = answer;
  }
}
