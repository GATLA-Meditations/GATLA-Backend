import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationMessageDto } from './dto/notification-message.dto';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async getNotificationSettingsById(user_id: string) {
    return await this.notificationRepository.getNotificationSettingsById(user_id);
  }

  async updateNotificationSettingsById(
    user_id: string,
    notificationSettings: {
      meditationNotifications: boolean;
      motivationalNotifications: boolean;
      phrasesNotifications: boolean;
    },
  ) {
    return this.notificationRepository.updateNotificationSettingsById(user_id, notificationSettings);
  }

  async sendPushNotification(message: NotificationMessageDto) {
    const tokens = await this.notificationRepository.getNotificationTokensByUserId(message.userId);
    tokens.map((token) => {
      firebaseAdmin.messaging().send({
        token: token.token,
        notification: {
          title: message.title,
          body: message.body,
        },
      });
    });
  }
}
