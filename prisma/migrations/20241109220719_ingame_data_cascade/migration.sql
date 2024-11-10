-- DropForeignKey
ALTER TABLE "IngameData" DROP CONSTRAINT "IngameData_userId_fkey";

-- AddForeignKey
ALTER TABLE "IngameData" ADD CONSTRAINT "IngameData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
