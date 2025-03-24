import { Questionnaire } from '@prisma/client';
import { HttpException, Injectable } from '@nestjs/common';
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

  // this one creates the csv with a column per question
  public async exportToCsv(questionnaireId: string, res: Response) {
    const questionnaire = await this.repository.findByIdIncludeQuestionsAndSubmissions(questionnaireId);
    if (!questionnaire) throw new HttpException('Questionnaire not found', 404);

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
        createdAt: submission.createdAt.toLocaleDateString('es-ES'),
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

  // this one creates the csv with a column per measured variable
  public async exportToCsvMeasuredVariable(questionnaireId: string, res: Response) {
    const questionnaire = await this.repository.findByIdIncludeQuestionsAndSubmissions(questionnaireId);
    if (!questionnaire) throw new HttpException('Questionnaire not found', 404);

    // Filter valid questions and get unique measured variables
    const questions = questionnaire.questions.filter((question) => question.type !== 'NOT_A_QUESTION');
    const measuredVariables = [...new Set(questions.map((q) => q.measuredVariable).filter(Boolean))];

    // Create columns for CSV
    const columns = [
      { key: 'patientCode', header: 'Cdo Paciente' },
      { key: 'createdAt', header: 'Fecha de Respuesta' },
      ...measuredVariables.map((variable) => ({ key: variable, header: variable })),
    ];

    // Process the data for each submission
    const data = questionnaire.questionnaireSubmissions.map((submission) => {
      // Initialize an object with all measured variables set to 0
      const variableScores = measuredVariables.reduce((acc, variable) => {
        acc[variable] = 0;
        return acc;
      }, {});

      // Sum up the answers for each measured variable
      submission.answers.forEach((answer) => {
        const question = questions.find((q) => q.id === answer.questionId);

        if (question?.measuredVariable) {
          let numericValue = 0;

          if (question.type === 'NUMERIC') {
            // For numeric questions, directly use the answer
            numericValue = Number(answer.answer);
          } else if (question.type === 'SINGLE_CHOICE') {
            // For single choice questions, find the corresponding numeric value
            try {
              // Parse metadata to get options (assuming it's a JSON string)
              const options = JSON.parse(question.metadata).options;

              // Find the index of the selected option
              const selectedIndex = options.findIndex((option) => option === answer.answer);

              // If found and metadataValues exists at that index, use that value
              if (selectedIndex !== -1 && question.metadataValues[selectedIndex] !== undefined) {
                numericValue = question.metadataValues[selectedIndex];
              }

              // If the question is inverted, invert the score (assuming a scale)
              if (question.isInverted && numericValue !== 0) {
                // Assuming we can determine the max value from metadataValues
                const maxValue = Math.max(...question.metadataValues);
                numericValue = maxValue - numericValue + 1; // +1 to maintain the same scale
              }
            } catch (e) {
              // If metadata parsing fails, leave value as 0
              console.error(`Error parsing metadata for question ${question.id}:`, e);
            }
          }

          if (!isNaN(numericValue)) {
            variableScores[question.measuredVariable] += numericValue;
          }
        }
      });

      // Return the processed data row
      return {
        patientCode: submission.user.patient_code,
        createdAt: submission.createdAt.toLocaleDateString('es-ES'),
        ...variableScores,
      };
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${questionnaire.name}_variables.csv"`);

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
          res.send(output);
        }
      },
    );
  }
}
