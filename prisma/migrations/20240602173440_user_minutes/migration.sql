/*
  Warnings:

  - You are about to drop the column `minutesSpent` on the `UserModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserModule" DROP COLUMN "minutesSpent",
ADD COLUMN     "medIntroduction" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weekIntroduction" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserModuleMinutesSpent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutesSpent" INTEGER NOT NULL,
    "userModuleId" TEXT NOT NULL,

    CONSTRAINT "UserModuleMinutesSpent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserModuleMinutesSpent" ADD CONSTRAINT "UserModuleMinutesSpent_userModuleId_fkey" FOREIGN KEY ("userModuleId") REFERENCES "UserModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
