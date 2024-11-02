import { ACHIEVEMENT_TYPE } from '@prisma/client';

interface _AchievementDto {
  id: string;
  type: ACHIEVEMENT_TYPE;
  title: string;
  lockedDescription: string;
  lockedImage: string;
  unlockedDescription: string;
  unlockedImage: string;
  dataKey: { dataKey: string };
  dataValue: string;
}

export class AchievementUser {
  id: string;
  title: string;
  unlockedDescription: string;
  unlockedImage: string;
  dataKey: string;
  dataValue: string;
  createdAt: Date;

  constructor(element: { Achievement: _AchievementDto; createdAt: Date }) {
    this.id = element.Achievement.id;
    this.title = element.Achievement.title;
    this.unlockedDescription = element.Achievement.unlockedDescription;
    this.unlockedImage = element.Achievement.unlockedImage;
    this.dataKey = element.Achievement.dataKey.dataKey;
    this.dataValue = element.Achievement.dataValue;
    this.createdAt = element.createdAt;
  }
}

export interface AchievementDto {
  id: string;
  type: ACHIEVEMENT_TYPE;
  title: string;
  lockedDescription: string;
  lockedImage: string;
  unlockedDescription: string;
  unlockedImage: string;
  dataKey: string;
  dataValue: string;
}

export interface AchievementUserDto {
  id: string;
  title: string;
  unlockedDescription: string;
  unlockedImage: string;
  dataKey: string;
  dataValue: string;
  createdAt: Date;
}

export class UserAchievementDto {
  id: string;
  achivementId: string;
  userId: string;
  createdAt: Date;

  constructor(data: { id: string; achivementId: string; userId: string; createdAt: Date }) {
    this.id = data.id;
    this.achivementId = data.achivementId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
  }
}
