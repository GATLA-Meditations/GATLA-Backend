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
