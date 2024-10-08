import { SimpleModuleDto } from '../../module/dto/simple-module.dto';

export class TreatmentDto {
  id: string;
  name: string;
  description: string;
  modules?: SimpleModuleDto[];
  questionnaires?: any[];

  constructor(data: TreatmentDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.modules = data.modules;
    this.questionnaires = data.questionnaires;
  }
}
