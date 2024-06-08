-- CreateTable
CREATE TABLE "UserTreatment" (
    "id" TEXT NOT NULL,
    "startAnswer" BOOLEAN NOT NULL,
    "endAnswer" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,

    CONSTRAINT "UserTreatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionnaireToUserTreatment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionnaireToUserTreatment_AB_unique" ON "_QuestionnaireToUserTreatment"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionnaireToUserTreatment_B_index" ON "_QuestionnaireToUserTreatment"("B");

-- AddForeignKey
ALTER TABLE "UserTreatment" ADD CONSTRAINT "UserTreatment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTreatment" ADD CONSTRAINT "UserTreatment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireToUserTreatment" ADD CONSTRAINT "_QuestionnaireToUserTreatment_A_fkey" FOREIGN KEY ("A") REFERENCES "Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionnaireToUserTreatment" ADD CONSTRAINT "_QuestionnaireToUserTreatment_B_fkey" FOREIGN KEY ("B") REFERENCES "UserTreatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
