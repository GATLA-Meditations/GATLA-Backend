-- DropForeignKey
ALTER TABLE "QuestionModuleModule" DROP CONSTRAINT "QuestionModuleModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionModuleModule" DROP CONSTRAINT "QuestionModuleModule_questionModuleId_fkey";

-- DropForeignKey
ALTER TABLE "UserModuleMinutesSpent" DROP CONSTRAINT "UserModuleMinutesSpent_userModuleId_fkey";

-- AddForeignKey
ALTER TABLE "UserModuleMinutesSpent" ADD CONSTRAINT "UserModuleMinutesSpent_userModuleId_fkey" FOREIGN KEY ("userModuleId") REFERENCES "UserModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModuleModule" ADD CONSTRAINT "QuestionModuleModule_questionModuleId_fkey" FOREIGN KEY ("questionModuleId") REFERENCES "QuestionModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionModuleModule" ADD CONSTRAINT "QuestionModuleModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
