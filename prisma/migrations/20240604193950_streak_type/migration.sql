/*
  Warnings:

  - Added the required column `type` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Streak" ADD COLUMN     "type" TEXT NOT NULL;