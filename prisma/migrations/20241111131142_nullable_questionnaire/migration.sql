-- DropForeignKey
ALTER TABLE "QuestionnaireQuestion" DROP CONSTRAINT "QuestionnaireQuestion_questionnaireId_fkey";

-- AlterTable
ALTER TABLE "QuestionnaireQuestion" ALTER COLUMN "questionnaireId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionnaireQuestion" ADD CONSTRAINT "QuestionnaireQuestion_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;
