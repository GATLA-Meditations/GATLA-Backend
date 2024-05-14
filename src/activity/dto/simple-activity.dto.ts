export class SimpleActivityDto {
  id: string;
  name: string;

  constructor(data: SimpleActivityDto) {
    this.id = data.id;
    this.name = data.name;
  }
}
