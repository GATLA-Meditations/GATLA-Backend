/*
  Warnings:

  - You are about to drop the `_QuestionnaireToUserTreatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionnaireToUserTreatment" DROP CONSTRAINT "_QuestionnaireToUserTreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionnaireToUserTreatment" DROP CONSTRAINT "_QuestionnaireToUserTreatment_B_fkey";

-- AlterTable
ALTER TABLE "UserTreatment" ALTER COLUMN "startAnswer" SET DEFAULT false,
ALTER COLUMN "endAnswer" SET DEFAULT false;

-- DropTable
DROP TABLE "_QuestionnaireToUserTreatment";

-- CreateTable
CREATE TABLE "_QuestionnaireToTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionnaireToTreatment_AB_unique" ON "_QuestionnaireToTreatment"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionnaireToTreatment_B_index" ON "_QuestionnaireToTreatment"("B");

-- AddForeignKey
ALTER TABLE "_QuestionnaireToTreatment" ADD CONSTRAINT "_QuestionnaireToTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireToTreatment" ADD CONSTRAINT "_QuestionnaireToTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
