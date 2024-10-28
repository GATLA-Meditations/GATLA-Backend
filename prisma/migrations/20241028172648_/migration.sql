/*
  Warnings:

  - A unique constraint covering the columns `[userId,achivementId]` on the table `UserAchievement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achivementId_key" ON "UserAchievement"("userId", "achivementId");
