/*
  Warnings:

  - You are about to drop the column `medIntroduction` on the `UserModule` table. All the data in the column will be lost.
  - You are about to drop the column `weekIntroduction` on the `UserModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserModule" DROP COLUMN "medIntroduction",
DROP COLUMN "weekIntroduction";
