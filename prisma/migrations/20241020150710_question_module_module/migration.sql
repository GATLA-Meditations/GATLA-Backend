/*
  Warnings:

  - You are about to drop the column `moduleId` on the `QuestionModule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionModule" DROP CONSTRAINT "QuestionModule_moduleId_fkey";

-- AlterTable
ALTER TABLE "QuestionModule" DROP COLUMN "moduleId";

-- CreateTable
CREATE TABLE "QuestionModuleModule" (
    "id" TEXT NOT NULL,
    "questionModuleId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "QuestionModuleModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionModuleModule_questionModuleId_moduleId_key" ON "QuestionModuleModule"("questionModuleId", "moduleId");

-- AddForeignKey
ALTER TABLE "QuestionModuleModule" ADD CONSTRAINT "QuestionModuleModule_questionModuleId_fkey" FOREIGN KEY ("questionModuleId") REFERENCES "QuestionModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModuleModule" ADD CONSTRAINT "QuestionModuleModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
