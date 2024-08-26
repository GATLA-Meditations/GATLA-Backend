-- CreateTable
CREATE TABLE "NotificationPreference" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "meditationNotifications" BOOLEAN NOT NULL DEFAULT true,
    "motivationalNotifications" BOOLEAN NOT NULL DEFAULT true,
    "phrasesNotifications" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_user_id_key" ON "NotificationPreference"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "NotificationPreference"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
