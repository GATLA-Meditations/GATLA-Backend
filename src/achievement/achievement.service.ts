import { HttpException, Injectable } from '@nestjs/common';
import { AchievementRepository } from './achievement.repository';
import { AchievementDto } from './dto/achievement.dto';

@Injectable()
export class AchievementService {
  constructor(private readonly achievementRepository: AchievementRepository) {}

  public async getAchievement(id: string) {
    const achievement = await this.achievementRepository.getAchievementById(id);
    if (!achievement) throw new HttpException('Achievement not found', 404);
    return transformAchievement(achievement);
  }
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
