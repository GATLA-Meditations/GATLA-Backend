/*
  Warnings:

  - You are about to drop the column `content_id` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ContentType" ADD VALUE 'TEXT';

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_content_id_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "content_id";

-- CreateTable
CREATE TABLE "ActivityContent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL,
    "activityId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "ActivityContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityContent" ADD CONSTRAINT "ActivityContent_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContent" ADD CONSTRAINT "ActivityContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
