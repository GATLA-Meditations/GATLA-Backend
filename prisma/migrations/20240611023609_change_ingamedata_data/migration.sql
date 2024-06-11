/*
  Warnings:

  - You are about to drop the column `currentStreak` on the `IngameData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IngameData" DROP COLUMN "currentStreak",
ADD COLUMN     "maxStreak" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserModuleMinutesSpent" ALTER COLUMN "minutesSpent" DROP DEFAULT;
