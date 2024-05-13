import { HttpException } from '@nestjs/common';

export class InvalidAnswerException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}
