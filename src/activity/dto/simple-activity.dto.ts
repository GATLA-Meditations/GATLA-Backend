export class SimpleActivityDto {
  id: string;
  name: string;
  unlocked: boolean;

  constructor(data: SimpleActivityDto) {
    this.id = data.id;
    this.name = data.name;
    this.unlocked = data.unlocked;
  }
}
