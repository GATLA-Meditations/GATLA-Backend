import { HttpException } from '@nestjs/common';

export class InvalidAnwerException extends HttpException{
  constructor(message: string) {
    super(message, 400);
  }
}