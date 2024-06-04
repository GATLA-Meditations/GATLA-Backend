import { HttpException, Injectable } from '@nestjs/common';
import { AchievementRepository } from './achievement.repository';
import { AchievementDto } from './dto/achievement.dto';

@Injectable()
export class AchievementService {
  constructor(private readonly achievementRepository: AchievementRepository) {}

  public async getAchievementById(id: string) {
    const achievement = await this.achievementRepository.getAchievementById(id);
    if (!achievement) throw new HttpException('Achievement not found', 404);
    return transformAchievement(achievement);
  }

  public async getAchievementByUserId(id: string) {
    const achievement =
      await this.achievementRepository.getAchievementsByUserId(id);
    return transformAchievements(achievement);
  }
}

function transformAchievements(achievement: any[]) {
  return achievement.map(transformAchievement);
}

function transformAchievement(achievement: any): AchievementDto {
  return {
    id: achievement.id,
    title: achievement.title,
    description: achievement.description,
    image: achievement.image,
    dataKey: achievement.dataKey.dataKey,
    dataValue: achievement.dataValue,
  };
}
