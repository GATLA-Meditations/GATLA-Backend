import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AchievementUser } from './dto/achievement.dto';

@Injectable()
export class AchievementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAchievementById(id: string) {
    return this.prisma.achievement.findUnique({
      where: {
        id,
      },
      include: {
        dataKey: true,
      },
    });
  }

  async getAchievementsByUserId(userId: string) {
    const results: any = await this.prisma.userAchievement.findMany({
      where: {
        userId: userId,
      },
      include: {
        Achievement: {
          include: {
            dataKey: true,
          },
        },
      },
    });
    return await results.map((result) => {
      return new AchievementUser(result);
    });
  }

  async getAchievements() {
    return this.prisma.achievement.findMany({
      include: {
        dataKey: true,
      },
    });
  }

  async updateAchievement(userId: string) {
    const today = new Date();
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        ingameData: true,
        questionnaireSubmissions: true,
      },
    });

    const userMaxStreak: number = user.ingameData.maxStreak;
    const userWatchTime: number = user.ingameData.totalWatchTime;
    const userModulesDone = await this.prisma.userModule.findMany({
      where: {
        AND: {
          userId: userId,
          endDate: { lte: today },
        },
      },
      select: { id: true },
    });
    const userQuestionares = user.questionnaireSubmissions;

    async function updateStreakAchievements(userMaxStreak: number, userId: string, prisma: PrismaService) {
      const streakAchievements = await prisma.achievement.findMany({
        where: { dataKeyId: 'Racha' },
        include: { dataKey: true },
      });

      const userStreakAchievementsCompletedId = streakAchievements
        .filter((achievement) => parseInt(achievement.dataValue) <= userMaxStreak)
        .map((achievement) => achievement.id);

      const userAchievements = userStreakAchievementsCompletedId.map((id) => {
        return {
          achivementId: id,
          userId: userId,
        };
      });

      await prisma.userAchievement.createMany({
        skipDuplicates: true,
        data: userAchievements,
      });
    }

    await updateStreakAchievements(userMaxStreak, userId, this.prisma);

    async function updateWatchTimeAchievements(userWatchTime: number, userId: string, prisma: PrismaService) {
      const watchTimeAchievements = await prisma.achievement.findMany({
        where: { dataKeyId: 'Minutos' },
        include: { dataKey: true },
      });

      const userWatchTimeAchievementsCompletedId = watchTimeAchievements
        .filter((achievement) => parseInt(achievement.dataValue) <= userMaxStreak)
        .map((achievement) => achievement.id);

      const userAchievements = userWatchTimeAchievementsCompletedId.map((id) => {
        return {
          achivementId: id,
          userId: userId,
        };
      });

      await prisma.userAchievement.createMany({
        skipDuplicates: true,
        data: userAchievements,
      });
    }

    await updateWatchTimeAchievements(userWatchTime, userId, this.prisma);

    async function updateModuleAchievements(userModulesDone: { id: string }[], userId: string, prisma: PrismaService) {
      interface ModuleAchievement {
        options: {
          id: string[];
          number: number;
        };
      }

      const moduleAchievements = await prisma.achievement.findMany({
        where: { dataKeyId: 'Semanas' },
        include: { dataKey: true },
      });

      // Count occurrences for each module ID
      const completedModuleCounts = userModulesDone.reduce(
        (acc, module) => {
          acc[module.id] = (acc[module.id] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Filter achievements based on criteria
      const userModuleAchievementsCompleted = moduleAchievements
        .filter((achievement) => {
          try {
            const value: ModuleAchievement = JSON.parse(achievement.dataValue);
            // Check if all IDs in `value.options.id` have occurrences >= `value.options.number`
            return value.options.id.every((id) => completedModuleCounts[id] >= value.options.number);
          } catch (error) {
            console.error('Invalid JSON dataValue:', error);
            return false;
          }
        })
        .map((achievement) => achievement.id);

      // Prepare user achievements
      const userAchievements = userModuleAchievementsCompleted.map((id) => ({
        achivementId: id,
        userId: userId,
      }));

      // Save user achievements
      await prisma.userAchievement.createMany({
        skipDuplicates: true,
        data: userAchievements,
      });
    }

    await updateModuleAchievements(userModulesDone, userId, this.prisma);

    async function updateTestAchievements(
      userQuestionnaires: { id: string; createdAt: Date; userId: string; questionnaireId: string }[],
      userId: string,
      prisma: PrismaService,
    ) {
      interface TestAchievement {
        options: {
          id: string;
          number: number;
        };
      }

      // Fetch relevant achievements
      const testAchievements = await prisma.achievement.findMany({
        where: { dataKeyId: 'Finalidad del test' },
        include: { dataKey: true },
      });

      // Count occurrences for each questionnaire ID
      const completedTestCounts = userQuestionnaires.reduce(
        (acc, questionnaire) => {
          acc[questionnaire.questionnaireId] = (acc[questionnaire.questionnaireId] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      // Filter achievements based on completion criteria
      const userTestAchievementsCompleted = testAchievements
        .filter((achievement) => {
          try {
            const value: TestAchievement = JSON.parse(achievement.dataValue);

            // Ensure `options.id` and `options.number` exist in `dataValue`
            if (!value?.options?.id || typeof value.options.number !== 'number') {
              throw new Error('Invalid dataValue structure');
            }

            // Check if the specified questionnaire ID meets the required completion count
            return completedTestCounts[value.options.id] >= value.options.number;
          } catch (error) {
            console.error('Invalid JSON dataValue:', error);
            return false;
          }
        })
        .map((achievement) => achievement.id);

      // Prepare user achievements for insertion
      const userAchievements = userTestAchievementsCompleted.map((id) => ({
        achivementId: id,
        userId: userId,
      }));

      await prisma.userAchievement.createMany({
        skipDuplicates: true,
        data: userAchievements,
      });
    }

    await updateTestAchievements(userQuestionares, userId, this.prisma);
  }
}
