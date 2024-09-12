/*
  Warnings:

  - You are about to drop the column `order` on the `UserModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserModule" DROP COLUMN "order",
ADD COLUMN     "lastViewedOrder" INTEGER NOT NULL DEFAULT 1;
