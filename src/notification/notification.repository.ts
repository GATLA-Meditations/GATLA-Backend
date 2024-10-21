import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getNotificationTokensByUserId(user_id: string) {
    return this.prisma.token.findMany({
      where: {
        userId: user_id,
      },
    });
  }

  async getNotificationSettingsById(user_id: string) {
    const notPref = await this.prisma.notificationPreference.findUnique({
      where: { user_id: user_id },
    });
    if (notPref === undefined || notPref === null) {
      return this.prisma.notificationPreference.create({
        data: {
          User: {
            connect: {
              id: user_id,
            },
          },
        },
      });
    } else {
      return notPref;
    }
  }

  updateNotificationSettingsById(
    user_id: string,
    notificationSettings: {
      meditationNotifications: boolean;
      motivationalNotifications: boolean;
      phrasesNotifications: boolean;
    },
  ) {
    return this.prisma.notificationPreference.upsert({
      where: {
        user_id: user_id,
      },
      create: {
        User: { connect: { id: user_id } },
        motivationalNotifications: notificationSettings.motivationalNotifications,
        meditationNotifications: notificationSettings.meditationNotifications,
        phrasesNotifications: notificationSettings.phrasesNotifications,
      },
      update: {
        motivationalNotifications: notificationSettings.motivationalNotifications,
        meditationNotifications: notificationSettings.meditationNotifications,
        phrasesNotifications: notificationSettings.phrasesNotifications,
      },
    });
  }

  async getNotificationTokenByUserIdAndToken(userId: string, token: string) {
    return this.prisma.token.findFirst({
      where: {
        userId: userId,
        token: token,
      },
    });
  }

  async createToken(userId: string, token: string) {
    return this.prisma.token.create({
      data: {
        userId,
        token,
      },
    });
  }

  async notifyUser(notificationId: string, userId: string) {
    return this.prisma.userNotification.create({
      data: {
        notificationId,
        userId,
      },
    });
  }

  async createNotification(notificationData: { title: string; content: string }) {
    return this.prisma.notification.create({
      data: {
        title: notificationData.title,
        content: notificationData.content,
      },
    });
  }

  async getNotificationsByUserId(userId: string) {
    return this.prisma.userNotification.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        notification: {},
        userId: true,
        read: true,
      },
    });
  }

  markNotificationAsRead(notificationId: string) {
    return this.prisma.userNotification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }
}
