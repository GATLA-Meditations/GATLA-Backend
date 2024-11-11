import { QuestionType } from '@prisma/client';

class createQuestionnaireDto {
  name: string;
  questions: {
    type: QuestionType;
    name: string;
    metadata: string;
  }[];
  treatmentId: string[];
}

export default createQuestionnaireDto;

export class UpdateQuestionnaireDto {
  name: string;
  questions: {
    id?: string;
    type: QuestionType;
    name: string;
    metadata: string;
  }[];
}
