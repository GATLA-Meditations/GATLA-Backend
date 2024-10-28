import { Questionnaire } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { QuestionnaireRepository } from './questionnaire.repository';
import { Response } from 'express';
import { stringify } from 'csv-stringify';

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

  public async exportToCsv(questionnaireId: string, res: Response) {
    const questionnaire = await this.repository.findByIdIncludeQuestionsAndSubmissions(questionnaireId);
    const questions = questionnaire.questions.filter((question) => question.type !== 'NOT_A_QUESTION');
    const columns = [
      { key: 'patientCode', header: 'Cdo Paciente' },
      { key: 'createdAt', header: 'Fecha de Respuesta' },
      ...questions.map((question) => ({ key: question.id, header: question.name })),
    ];

    const data = questionnaire.questionnaireSubmissions.map((submission) => {
      const answers = submission.answers.map((answer) => {
        return {
          [answer.questionId]: answer.answer,
        };
      });

      return {
        patientCode: submission.user.patient_code,
        createdAt: submission.createdAt.toISOString(),
        ...answers.reduce((acc, answer) => ({ ...acc, ...answer }), {}),
      };
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${questionnaire.name}.csv"`);

    stringify(
      data,
      {
        header: true,
        columns,
      },
      (err, output) => {
        if (err) {
          res.status(500).send('Error generating CSV');
        } else {
          // Send the generated CSV data as a response
          res.send(output);
        }
      },
    );
  }
}
