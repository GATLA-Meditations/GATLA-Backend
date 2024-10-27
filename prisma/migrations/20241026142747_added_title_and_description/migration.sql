/*
  Warnings:

  - You are about to drop the column `achievementId` on the `FriendAchievement` table. All the data in the column will be lost.
  - Added the required column `description` to the `FriendAchievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `FriendAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendAchievement" DROP CONSTRAINT "FriendAchievement_achievementId_fkey";

-- AlterTable
ALTER TABLE "FriendAchievement" DROP COLUMN "achievementId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
