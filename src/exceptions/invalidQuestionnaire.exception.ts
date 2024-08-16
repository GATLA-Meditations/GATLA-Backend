import { HttpException } from '@nestjs/common';

export class InvalidQuestionnaireException extends HttpException {
  constructor(public readonly message: string) {
    super(message, 400);
  }
}
