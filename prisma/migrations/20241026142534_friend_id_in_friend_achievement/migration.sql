/*
  Warnings:

  - Added the required column `friendId` to the `FriendAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendAchievement" ADD COLUMN     "friendId" TEXT NOT NULL;
