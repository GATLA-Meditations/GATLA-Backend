import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AchievementUser, UserAchievementDto } from './dto/achievement.dto';

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

  async updateAchievement(userId: string): Promise<UserAchievementDto[]> {
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
      where: { AND: { userId: userId, endDate: { lte: today } } },
      select: { id: true },
    });
    const userQuestionnaires = user.questionnaireSubmissions;

    const newAchievements: UserAchievementDto[] = [];

    // Update each type of achievement
    newAchievements.push(
      ...(await updateStreakAchievements(userMaxStreak, userId, this.prisma)),
      ...(await updateWatchTimeAchievements(userWatchTime, userId, this.prisma)),
      ...(await updateModuleAchievements(userModulesDone, userId, this.prisma)),
      ...(await updateTestAchievements(userQuestionnaires, userId, this.prisma)),
    );

    return newAchievements;
  }
}

// Helper function to save only newly created achievements
async function createAchievements(
  entries: { achivementId: string; userId: string }[],
  prisma: PrismaService,
): Promise<UserAchievementDto[]> {
  // Retrieve existing achievements to check for duplicates
  const existingAchievements = await prisma.userAchievement.findMany({
    where: {
      userId: entries[0]?.userId,
      achivementId: { in: entries.map((e) => e.achivementId) },
    },
    select: { achivementId: true },
  });

  // Determine which achievements are new by filtering out existing ones
  const existingAchievementIds = new Set(existingAchievements.map((a) => a.achivementId));
  const newEntries = entries.filter((entry) => !existingAchievementIds.has(entry.achivementId));

  // Insert only new achievements
  await prisma.userAchievement.createMany({
    data: newEntries,
    skipDuplicates: true,
  });

  // Fetch the newly created achievements
  const newlyCreatedAchievements = await prisma.userAchievement.findMany({
    where: {
      userId: entries[0]?.userId,
      achivementId: { in: newEntries.map((e) => e.achivementId) },
    },
  });

  return newlyCreatedAchievements.map((ach) => new UserAchievementDto(ach));
}

// Streak Achievements
async function updateStreakAchievements(userMaxStreak: number, userId: string, prisma: PrismaService): Promise<UserAchievementDto[]> {
  const streakAchievements = await prisma.achievement.findMany({
    where: { dataKeyId: 'Racha' },
    include: { dataKey: true },
  });

  const userStreakAchievementsCompleted = streakAchievements
    .filter((achievement) => parseInt(achievement.dataValue) <= userMaxStreak)
    .map((achievement) => ({ achivementId: achievement.id, userId }));

  return createAchievements(userStreakAchievementsCompleted, prisma);
}

// Watch Time Achievements
async function updateWatchTimeAchievements(userWatchTime: number, userId: string, prisma: PrismaService): Promise<UserAchievementDto[]> {
  const watchTimeAchievements = await prisma.achievement.findMany({
    where: { dataKeyId: 'Minutos' },
    include: { dataKey: true },
  });

  const userWatchTimeAchievementsCompleted = watchTimeAchievements
    .filter((achievement) => parseInt(achievement.dataValue) <= userWatchTime)
    .map((achievement) => ({ achivementId: achievement.id, userId }));

  return createAchievements(userWatchTimeAchievementsCompleted, prisma);
}

// Module Achievements
async function updateModuleAchievements(
  userModulesDone: { id: string }[],
  userId: string,
  prisma: PrismaService,
): Promise<UserAchievementDto[]> {
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

  const completedModuleCounts = userModulesDone.reduce(
    (acc, module) => {
      acc[module.id] = (acc[module.id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const userModuleAchievementsCompleted = moduleAchievements
    .filter((achievement) => {
      try {
        const value: ModuleAchievement = JSON.parse(achievement.dataValue);
        return value.options.id.every((id) => completedModuleCounts[id] >= value.options.number);
      } catch (error) {
        console.error('Invalid JSON dataValue:', error);
        return false;
      }
    })
    .map((achievement) => ({ achivementId: achievement.id, userId }));

  return createAchievements(userModuleAchievementsCompleted, prisma);
}

// Test Achievements
async function updateTestAchievements(
  userQuestionnaires: { id: string; createdAt: Date; userId: string; questionnaireId: string }[],
  userId: string,
  prisma: PrismaService,
): Promise<UserAchievementDto[]> {
  interface TestAchievement {
    options: {
      id: string;
      number: number;
    };
  }

  const testAchievements = await prisma.achievement.findMany({
    where: { dataKeyId: 'Finalidad del test' },
    include: { dataKey: true },
  });

  const completedTestCounts = userQuestionnaires.reduce(
    (acc, questionnaire) => {
      acc[questionnaire.questionnaireId] = (acc[questionnaire.questionnaireId] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const userTestAchievementsCompleted = testAchievements
    .filter((achievement) => {
      try {
        const value: TestAchievement = JSON.parse(achievement.dataValue);
        if (!value?.options?.id || typeof value.options.number !== 'number') {
          throw new Error('Invalid dataValue structure');
        }
        return completedTestCounts[value.options.id] >= value.options.number;
      } catch (error) {
        console.error('Invalid JSON dataValue:', error);
        return false;
      }
    })
    .map((achievement) => ({ achivementId: achievement.id, userId }));

  return createAchievements(userTestAchievementsCompleted, prisma);
}
