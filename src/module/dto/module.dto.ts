import { SimpleActivityDto } from '../../activity/dto/simple-activity.dto';

export enum ModuleType {
  MEDITATION = 'MEDITATION',
  QUESTIONNAIRES = 'QUESTIONNAIRES',
}

export class ModuleDto {
  type: ModuleType;
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
    this.type = data.type;
  }
}
