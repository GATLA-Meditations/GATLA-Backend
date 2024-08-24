import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.notificationPreference.update({
      where: {
        user_id: user_id,
      },
      data: {
        motivationalNotifications: notificationSettings.motivationalNotifications,
        meditationNotifications: notificationSettings.meditationNotifications,
        phrasesNotifications: notificationSettings.phrasesNotifications,
      },
    });
  }
}
