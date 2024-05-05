import { Controller, Get, Param } from '@nestjs/common';
import { Questionnaire } from '@prisma/client';
import { QuestionnaireService } from './questionnaire.service';

@Controller('/questionnaire')
export class QuestionnaireController {
  constructor(private service: QuestionnaireService) {}

  @Get('get/:id')
  async getById(@Param('id') id: string): Promise<Questionnaire | undefined> {
    return await this.service.getQuestionnaire(id);
  }
}
