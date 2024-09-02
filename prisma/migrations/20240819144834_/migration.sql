/*
  Warnings:

  - You are about to drop the `Background` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBackground` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserBackground" DROP CONSTRAINT "UserBackground_background_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBackground" DROP CONSTRAINT "UserBackground_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "background" TEXT;

-- DropTable
DROP TABLE "Background";

-- DropTable
DROP TABLE "UserBackground";
