import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Questionnaire } from '@prisma/client';
import { QuestionnaireService } from './questionnaire.service';
import { response } from 'express';

@Controller('/questionnaire')
export class QuestionnaireController {
  constructor(private service: QuestionnaireService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Questionnaire > {
    return await this.service.getQuestionnaire(id).catch(_ => {throw new NotFoundException(`Questionnaire with ID ${id} not found`)});
  }
}
