import { IsNotEmpty } from 'class-validator';

export class QuestionsDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly question: string;

  constructor(id: string, question: string) {
    this.id = id;
    this.question = question;
  }
}
