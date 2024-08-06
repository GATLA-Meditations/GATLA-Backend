import { Body, Controller, Get, Param, Post, UseGuards, Request, Put } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePhraseDto } from './dto/create-phrase.dto';

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

  @Post()
  async createPhrase(@Body() data: CreatePhraseDto, @Request() req: any) {
    return await this.service.createPhrase(req.user.userId, data);
  }

  @Put('/:id')
  async editPhrase(@Param('id') id: string, @Body() data: CreatePhraseDto, @Request() req: any) {
    return await this.service.editPhrase(req.user.userId, id, data);
  }
}
