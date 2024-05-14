import { ContentType } from '@prisma/client';

export class ContentDto {
  id: string;
  type: ContentType;
  content: string;

  constructor(data: ContentDto) {
    this.id = data.id;
    this.type = data.type;
    this.content = data.content;
  }
}
