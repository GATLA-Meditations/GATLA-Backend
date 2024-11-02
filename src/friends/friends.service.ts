import { HttpException, Injectable } from '@nestjs/common';
import FriendsRepository from './friends.repository';
import { NotificationService } from '../notification/notification.service';
import { AchievementService } from '../achievement/achievement.service';
import { UserAchievementDto } from '../achievement/dto/achievement.dto';

@Injectable()
export class FriendsService {
  constructor(
    private readonly repository: FriendsRepository,
    private readonly notificationService: NotificationService,
    private readonly achievementService: AchievementService,
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

  async notifyFriends(userId: string, messageData: { title: string; content: string }) {
    const friends = await this.repository.getFriends(userId);
    for (const friendId in friends) {
      await this.repository.notifyFriend(userId, friendId, messageData);
    }
  }

  async congratulateFriend(userId: string, friendId: string, message: string) {
    if (!(await this.isFriend(userId, friendId))) {
      throw new HttpException('Users are not friends', 400);
    }
    const notificationToFriend = await this.notificationService.createNotification({
      title: 'Felicitaciones!',
      content: message,
    });
    await this.notificationService.notifyUser(notificationToFriend.id, friendId);
  }

  async getFriendsNotifications(userId: string) {
    return this.repository.getFriendNotifications(userId);
  }

  async updateFriendNotifications(userId: string) {
    const user = await this.repository.getUserById(userId);
    const newAchievements = (await this.achievementService.updateUserAchievements(userId)) as UserAchievementDto[];
    for (const userAchievement of newAchievements) {
      const achievement = await this.achievementService.getAchievementById(userAchievement.achivementId);
      await this.notifyFriends(userId, {
        title: `${user.patient_code} sigue avanzando en su camino de sanación y crecimiento.`,
        content: `¡${user.patient_code} ha alcanzado un nuevo logro en su proceso de bienestar: ${achievement.title}!`,
      });
    }
  }
}
