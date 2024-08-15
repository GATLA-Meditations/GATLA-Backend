import { Injectable } from '@nestjs/common';
import { PhraseRepository } from './phrase.repository';
import { CreatePhraseDto } from './dto/create-phrase.dto';

@Injectable()
export class PhraseService {
  constructor(private repository: PhraseRepository) {}

  async getPhrases() {
    return await this.repository.getPhrases();
  }

  async getPhraseById(id: string) {
    return await this.repository.getPhraseById(id);
  }

  async createPhrase(data: CreatePhraseDto) {
    return await this.repository.createPhrase(data);
  }

  async editPhrase(id: string, data: CreatePhraseDto) {
    return await this.repository.editPhrase(id, data);
  }
}
