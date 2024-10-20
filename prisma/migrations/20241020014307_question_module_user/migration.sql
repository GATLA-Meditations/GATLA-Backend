/*
  Warnings:

  - You are about to drop the `QualitativeQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QualitativeQuestionUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QualitativeQuestion" DROP CONSTRAINT "QualitativeQuestion_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "QualitativeQuestionUser" DROP CONSTRAINT "QualitativeQuestionUser_qualitativeQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "QualitativeQuestionUser" DROP CONSTRAINT "QualitativeQuestionUser_userId_fkey";

-- DropTable
DROP TABLE "QualitativeQuestion";

-- DropTable
DROP TABLE "QualitativeQuestionUser";

-- CreateTable
CREATE TABLE "QuestionModule" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "QuestionModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionModuleUser" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "moduleQuestionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QuestionModuleUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionModule" ADD CONSTRAINT "QuestionModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModuleUser" ADD CONSTRAINT "QuestionModuleUser_moduleQuestionId_fkey" FOREIGN KEY ("moduleQuestionId") REFERENCES "QuestionModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModuleUser" ADD CONSTRAINT "QuestionModuleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
