-- AlterTable
ALTER TABLE "QuestionnaireSubmission" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experimentalGroupId" TEXT,
ADD COLUMN     "invalidationReason" TEXT,
ADD COLUMN     "isInvalidated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "programStartDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ExperimentalGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "durationWeeks" INTEGER NOT NULL,
    "questionnaireWeeks" INTEGER[],
    "meditationWeeks" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ExperimentalGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_experimentalGroupId_fkey" FOREIGN KEY ("experimentalGroupId") REFERENCES "ExperimentalGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
