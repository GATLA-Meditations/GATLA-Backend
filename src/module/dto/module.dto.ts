import { SimpleActivityDto } from '../../activity/dto/simple-activity.dto';

export class ModuleDto {
  id: string;
  name: string;
  description: string;
  activities: SimpleActivityDto[];
  progress: number;

  constructor(data: ModuleDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.activities = data.activities;
    this.progress = data.progress;
  }
}
