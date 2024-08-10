/*
  Warnings:

  - You are about to drop the column `description` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Achievement` table. All the data in the column will be lost.
  - Added the required column `lockedDescription` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lockedImage` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlockedDescription` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlockedImage` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ACHIEVEMENT_TYPE" AS ENUM ('COMMON', 'HIDDEN');

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "description",
DROP COLUMN "image",
ADD COLUMN     "lockedDescription" TEXT NOT NULL,
ADD COLUMN     "lockedImage" TEXT NOT NULL,
ADD COLUMN     "type" "ACHIEVEMENT_TYPE" NOT NULL,
ADD COLUMN     "unlockedDescription" TEXT NOT NULL,
ADD COLUMN     "unlockedImage" TEXT NOT NULL;
