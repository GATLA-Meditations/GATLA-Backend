import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { Questionnaire } from '@prisma/client';
import { QuestionnaireService } from './questionnaire.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Questionnaire')
@Controller('/questionnaire')
export class QuestionnaireController {
  constructor(private service: QuestionnaireService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Questionnaire> {
    return await this.service.getQuestionnaire(id).catch(() => {
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    });
  }

  @Get()
  async getAll(): Promise<Questionnaire[]> {
    return await this.service.getAllQuestionnaires();
  }
}
