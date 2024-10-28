import { Controller, Get, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
import { Questionnaire } from '@prisma/client';
import { QuestionnaireService } from './questionnaire.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get(':id/export')
  async exportToCsv(@Param('id') id: string, @Res() res: Response) {
    return await this.service.exportToCsv(id, res);
  }
}
