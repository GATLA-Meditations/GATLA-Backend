export class SimpleModuleDto {
  id: string;
  name: string;
  description: string;

  constructor(data: SimpleModuleDto) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
