interface _AchievementDto {
  id: string;
  title: string;
  description: string;
  image: string;
  dataKey: { dataKey: string };
  dataValue: string;
}

export class AchievementUser {
  id: string;
  title: string;
  description: string;
  image: string;
  dataKey: string;
  dataValue: string;
  createdAt: Date;

  constructor(element: { achievement: _AchievementDto; createdAt: Date }) {
    this.id = element.achievement.id;
    this.title = element.achievement.title;
    this.description = element.achievement.description;
    this.image = element.achievement.image;
    this.dataKey = element.achievement.dataKey.dataKey;
    this.dataValue = element.achievement.dataValue;
    this.createdAt = element.createdAt;
  }
}

export interface AchievementDto {
  id: string;
  title: string;
  description: string;
  image: string;
  dataKey: string;
  dataValue: string;
}

export interface AchievementUserDto {
  id: string;
  title: string;
  description: string;
  image: string;
  dataKey: string;
  dataValue: string;
  createdAt: Date;
}
