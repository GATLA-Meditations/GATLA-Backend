-- AlterTable
ALTER TABLE "QuestionnaireQuestion" ADD COLUMN     "isInverted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "measuredVariable" TEXT,
ADD COLUMN     "metadataValues" INTEGER[];
