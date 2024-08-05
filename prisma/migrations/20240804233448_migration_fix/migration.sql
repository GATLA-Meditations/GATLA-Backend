/*
  Warnings:

  - You are about to drop the `_QuestionnaireToTreatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionnaireToTreatment" DROP CONSTRAINT "_QuestionnaireToTreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionnaireToTreatment" DROP CONSTRAINT "_QuestionnaireToTreatment_B_fkey";

-- DropTable
DROP TABLE "_QuestionnaireToTreatment";

-- CreateTable
CREATE TABLE "_TreatmentQuestionnaire" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TreatmentQuestionnaire_AB_unique" ON "_TreatmentQuestionnaire"("A", "B");

-- CreateIndex
CREATE INDEX "_TreatmentQuestionnaire_B_index" ON "_TreatmentQuestionnaire"("B");

-- AddForeignKey
ALTER TABLE "_TreatmentQuestionnaire" ADD CONSTRAINT "_TreatmentQuestionnaire_A_fkey" FOREIGN KEY ("A") REFERENCES "Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentQuestionnaire" ADD CONSTRAINT "_TreatmentQuestionnaire_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
