import { Body, Controller, Get, Param, Post, UseGuards, Put } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('/phrases')
@UseGuards(JwtGuard)
export class PhraseController {
  constructor(private service: PhraseService) {}

  @Get()
  async getPhrases() {
    return await this.service.getPhrases();
  }

  @Get('/:id')
  async getPhraseById(@Param('id') id: string) {
    return await this.service.getPhraseById(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createPhrase(@Body() data: CreatePhraseDto) {
    return await this.service.createPhrase(data);
  }

  @UseGuards(AdminGuard)
  @Put('/:id')
  async editPhrase(@Param('id') id: string, @Body() data: CreatePhraseDto) {
    return await this.service.editPhrase(id, data);
  }
}
