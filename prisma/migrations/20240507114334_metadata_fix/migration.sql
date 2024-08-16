-- DropForeignKey
ALTER TABLE "QuestionnaireQuestion" DROP CONSTRAINT "QuestionnaireQuestion_metadata_fkey";

-- AddForeignKey
ALTER TABLE "QuestionnaireQuestion" ADD CONSTRAINT "QuestionnaireQuestion_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
