import { Injectable } from '@nestjs/common';
import { PhraseRepository } from './phrase.repository';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { ModulePhraseDto } from './dto/module-phrase.dto';

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

  async connectModule(data: ModulePhraseDto) {
    return await this.repository.connectModule(data);
  }

  async getPhrasesByModuleId(id: string) {
    return this.repository.getPhrasesByModuleId(id);
  }
}
