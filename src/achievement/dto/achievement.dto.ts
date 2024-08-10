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

  constructor(element: { achievement: _AchievementDto; createdAt: Date }) {
    this.id = element.achievement.id;
    this.title = element.achievement.title;
    this.unlockedDescription = element.achievement.unlockedDescription;
    this.unlockedImage = element.achievement.unlockedImage;
    this.dataKey = element.achievement.dataKey.dataKey;
    this.dataValue = element.achievement.dataValue;
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
