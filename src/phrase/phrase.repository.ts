import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { ModulePhraseDto } from './dto/module-phrase.dto';

@Injectable()
export class PhraseRepository {
  constructor(private prism: PrismaService) {}

  async getPhrases() {
    return await this.prism.phrase.findMany();
  }

  async getPhraseById(id: string) {
    return await this.prism.phrase.findUnique({
      where: {
        id,
      },
    });
  }

  async createPhrase(data: CreatePhraseDto) {
    return await this.prism.phrase.create({
      data,
    });
  }

  async editPhrase(id: string, data: CreatePhraseDto) {
    return await this.prism.phrase.update({
      where: {
        id,
      },
      data,
    });
  }

  async deletePhrase(id: string) {
    return await this.prism.phrase.delete({
      where: {
        id,
      },
    });
  }

  async connectModule(data: ModulePhraseDto) {
    return this.prism.modulePhrase.create({
      data: {
        phrase: {
          connect: { id: data.phrase_id },
        },
        module: {
          connect: { id: data.module_id },
        },
      },
    });
  }
}
