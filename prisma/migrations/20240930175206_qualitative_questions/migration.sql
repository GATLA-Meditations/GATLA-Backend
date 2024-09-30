-- CreateTable
CREATE TABLE "QualitativeQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "QualitativeQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualitativeQuestionUser" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "qualitativeQuestionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QualitativeQuestionUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QualitativeQuestion" ADD CONSTRAINT "QualitativeQuestion_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualitativeQuestionUser" ADD CONSTRAINT "QualitativeQuestionUser_qualitativeQuestionId_fkey" FOREIGN KEY ("qualitativeQuestionId") REFERENCES "QualitativeQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualitativeQuestionUser" ADD CONSTRAINT "QualitativeQuestionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
