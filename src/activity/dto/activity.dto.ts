import { ContentDto } from './content.dto';

export class ActivityDto {
  id: string;
  name: string;
  contents: ContentDto[];

  constructor(data: ActivityDto) {
    this.id = data.id;
    this.name = data.name;
    this.contents = data.contents;
  }
}
