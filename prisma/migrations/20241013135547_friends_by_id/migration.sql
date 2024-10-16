-- AlterTable
ALTER TABLE "User" ADD COLUMN     "friendsId" TEXT[] DEFAULT ARRAY[]::TEXT[];
