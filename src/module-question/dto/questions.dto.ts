import { IsNotEmpty } from 'class-validator';

export class QuestionsDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly question: string;
  @IsNotEmpty()
  readonly type: string;
  readonly metadata: string;

  constructor(id: string, question: string, type: string, metadata: string) {
    this.id = id;
    this.question = question;
    this.type = type;
    this.metadata = metadata;
  }
}
