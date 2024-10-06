import { IsNotEmpty } from 'class-validator';

export class NotificationMessageDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  body: string;

  constructor(data: NotificationMessageDto) {
    this.title = data.title;
    this.body = data.body;
  }
}
