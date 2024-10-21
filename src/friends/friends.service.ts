import { HttpException, Injectable } from '@nestjs/common';
import FriendsRepository from './friends.repository';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class FriendsService {
  constructor(
    private readonly repository: FriendsRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async addFriend(userId: string, friendId: string) {
    if (await this.isFriend(userId, friendId)) {
      throw new HttpException('Users are already friends', 400);
    }
    await this.repository.addFriend(userId, friendId);
  }

  async isFriend(userId: string, friendId: string) {
    const friends = await this.repository.getFriends(userId);
    for (const id in friends) {
      if (id === friendId) {
        return true;
      }
    }
    return false;
  }

  async deleteFriend(userId: string, friendId: string) {
    if (!(await this.isFriend(userId, friendId))) {
      throw new HttpException('Users are not friends', 400);
    }
    await this.repository.deleteFriend(userId, friendId);
  }

  async notifyFriends(userId: any, messageData: { title: string; content: string }) {
    const friends = await this.repository.getFriends(userId);
    const notification = await this.notificationService.createNotification(messageData);
    for (const friendId in friends) {
      await this.notificationService.notifyUser(notification.id, friendId);
    }
  }
}
