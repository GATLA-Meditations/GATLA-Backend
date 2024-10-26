-- CreateTable
CREATE TABLE "FriendAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,

    CONSTRAINT "FriendAchievement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FriendAchievement" ADD CONSTRAINT "FriendAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendAchievement" ADD CONSTRAINT "FriendAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
