/*
  Warnings:

  - You are about to drop the `_QuestionnaireToTreatment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ShopItemType" AS ENUM ('BACKGROUND', 'AVATAR', 'VIDEO');

-- DropForeignKey
ALTER TABLE "_QuestionnaireToTreatment" DROP CONSTRAINT "_QuestionnaireToTreatment_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionnaireToTreatment" DROP CONSTRAINT "_QuestionnaireToTreatment_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "renatokens" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_QuestionnaireToTreatment";

-- CreateTable
CREATE TABLE "ShopItem" (
    "id" TEXT NOT NULL,
    "type" "ShopItemType" NOT NULL,
    "price" INTEGER NOT NULL,
    "content_url" TEXT NOT NULL,

    CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShopItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shopItemId" TEXT NOT NULL,

    CONSTRAINT "UserShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TreatmentQuestionnaire" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TreatmentQuestionnaire_AB_unique" ON "_TreatmentQuestionnaire"("A", "B");

-- CreateIndex
CREATE INDEX "_TreatmentQuestionnaire_B_index" ON "_TreatmentQuestionnaire"("B");

-- AddForeignKey
ALTER TABLE "UserShopItem" ADD CONSTRAINT "UserShopItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShopItem" ADD CONSTRAINT "UserShopItem_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentQuestionnaire" ADD CONSTRAINT "_TreatmentQuestionnaire_A_fkey" FOREIGN KEY ("A") REFERENCES "Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TreatmentQuestionnaire" ADD CONSTRAINT "_TreatmentQuestionnaire_B_fkey" FOREIGN KEY ("B") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
