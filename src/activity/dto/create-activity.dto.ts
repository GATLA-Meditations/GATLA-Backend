import { CreateContentDto } from './create-content.dto';

export class createActivityDto {
  name: string;
  contents: CreateContentDto[];

  constructor(data: createActivityDto) {
    this.name = data.name;
    this.contents = data.contents;
  }
}
