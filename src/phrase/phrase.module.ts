import { Module } from '@nestjs/common';
import { PhraseRepository } from './phrase.repository';
import { PhraseService } from './phrase.service';
import { PrismaService } from 'src/prisma.service';
import { PhraseController } from './phrase.controller';

@Module({
  controllers: [PhraseController],
  providers: [PrismaService, PhraseRepository, PhraseService],
})
export class PhraseModule {}
