import { HttpException, Injectable } from '@nestjs/common';
import { AchievementRepository } from './achievement.repository';
import { AchievementDto, AchievementUserDto } from './dto/achievement.dto';

@Injectable()
export class AchievementService {
  constructor(private readonly achievementRepository: AchievementRepository) {}

  public async getAchievementById(id: string) {
    const achievement = await this.achievementRepository.getAchievementById(id);
    if (!achievement) throw new HttpException('Achievement not found', 404);
    return transformAchievement(achievement);
  }

  public async getAchievementByUserId(id: string): Promise<AchievementUserDto[]> {
    return (await this.achievementRepository.getAchievementsByUserId(id)) as AchievementUserDto[];
  }

  public async getAllAchievements(): Promise<AchievementDto[]> {
    return (await transformAchievements(await this.achievementRepository.getAchievements())) as AchievementDto[];
  }

  public async updateUserAchievements(userId: string): Promise<any> {
    return await this.achievementRepository.updateAchievement(userId);
  }
}

async function transformAchievements(achievement: any[]) {
  return achievement.map(transformAchievement);
}

function transformAchievement(achievement: any): AchievementDto {
  return {
    id: achievement.id,
    type: achievement.type,
    title: achievement.title,
    lockedDescription: achievement.lockedDescription,
    lockedImage: achievement.lockedImage,
    unlockedDescription: achievement.unlockedDescription,
    unlockedImage: achievement.unlockedImage,
    dataKey: achievement.dataKey.dataKey,
    dataValue: achievement.dataValue,
  };
}
