import { Injectable } from '@nestjs/common';
import { PhraseRepository } from './phrase.repository';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class PhraseService {
  constructor(private repository: PhraseRepository) {}

  async getPhrases() {
    return await this.repository.getPhrases();
  }

  async getPhraseById(id: string) {
    return await this.repository.getPhraseById(id);
  }

  // TODO: when admin rol is implemented it should be checked here
  async createPhrase(userId: string, data: CreatePhraseDto) {
    // ! Check if the user is an admin
    if (!userId) {
      throw new HttpErrorByCode['401']('Unauthorized: only admins can create phrases');
    }
    return await this.repository.createPhrase(data);
  }

  // TODO: when admin rol is implemented it should be checked here
  async editPhrase(userId: string, id: string, data: CreatePhraseDto) {
    // ! Check if the user is an admin
    if (!userId) {
      throw new HttpErrorByCode['401']('Unauthorized: only admins can edit phrases');
    }
    return await this.repository.editPhrase(id, data);
  }
}
