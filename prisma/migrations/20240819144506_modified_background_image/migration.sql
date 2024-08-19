/*
  Warnings:

  - You are about to drop the column `background` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "background";

-- CreateTable
CREATE TABLE "UserBackground" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "background_id" TEXT NOT NULL,

    CONSTRAINT "UserBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBackground_user_id_key" ON "UserBackground"("user_id");

-- AddForeignKey
ALTER TABLE "UserBackground" ADD CONSTRAINT "UserBackground_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBackground" ADD CONSTRAINT "UserBackground_background_id_fkey" FOREIGN KEY ("background_id") REFERENCES "Background"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
