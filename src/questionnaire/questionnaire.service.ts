import { Questionnaire } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from './questionnaire.repository';

@Injectable()
export class QuestionnaireService {
  constructor(private repository: QuestionnaireRepository) {}

  public async getQuestionnaire(id: string): Promise<Questionnaire> {
    return this.repository.findById(id);
  }
  public createQuestionnaire(questionnaire: Questionnaire): Promise<Questionnaire> {
    return this.repository.createQuestionnaire(questionnaire);
  }
  public async getAllQuestionnaires(): Promise<Questionnaire[]> {
    return this.repository.findAll();
  }
}
