import { Injectable } from '@nestjs/common';
import { IngameDataRepository } from './ingamedata.repository';

@Injectable()
export class IngameDataService {
  constructor(private repository: IngameDataRepository) {}

  async updateMaxStreak(id: string, maxStreak: number) {
    return await this.repository.updateMaxStreak(id, maxStreak);
  }
}
