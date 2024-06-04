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
