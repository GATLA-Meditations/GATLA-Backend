/*
  Warnings:

  - You are about to drop the column `sendQuesttionaire` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sendQuesttionaire",
ADD COLUMN     "sendQuestionnaire" BOOLEAN NOT NULL DEFAULT true;
