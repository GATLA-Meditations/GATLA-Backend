import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Questionnaire } from '@prisma/client';
import { QuestionnaireService } from './questionnaire.service';

@Controller('/questionnaire')
export class QuestionnaireController {
  constructor(private service: QuestionnaireService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Questionnaire> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return await this.service.getQuestionnaire(id).catch((_) => {
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    });
  }

  @Get()
  async getAll(): Promise<Questionnaire[]> {
    return await this.service.getAllQuestionnaires();
  }
}
