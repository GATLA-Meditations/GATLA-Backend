import { IsNotEmpty } from 'class-validator';

export class NotificationTokenDto {
  @IsNotEmpty()
  token: string;

  constructor(data: NotificationTokenDto) {
    this.token = data.token;
  }
}
