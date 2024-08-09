import { ContentType } from '@prisma/client';

export class CreateContentDto {
  type: ContentType;
  content: string;

  constructor(data: CreateContentDto) {
    this.type = data.type;
    this.content = data.content;
  }
}
