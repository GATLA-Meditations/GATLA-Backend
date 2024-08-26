import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

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
}
