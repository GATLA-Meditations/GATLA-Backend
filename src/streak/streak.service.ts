import { Injectable } from '@nestjs/common';
import { StreakRespository } from './streak.respository';
import * as cron from 'node-cron';

@Injectable()
export class StreakService {
  constructor(private readonly streakRepository: StreakRespository) {
    this.checkDaily();
  }

  private checkDaily() {
    cron.schedule('0 0 * * *', async () => {
      const dayBefore = new Date(new Date().setHours(-24, 0, 0, 0));
      await this.resetAllExpiredStreaks(dayBefore);
    });
  }

  public async checkStreak(userId: string) {
    const streak = await this.streakRepository.getStreakByUserId(userId);
    if (!streak) {
      await this.streakRepository.createAndAssignStreak(userId);
      return;
    }
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    if (today > streak.lastUpdate) await this.streakRepository.incrementStreak(userId, 1);
  }

  private async resetAllExpiredStreaks(date: Date) {
    await this.streakRepository.resetStreaksUpdatedBeforeDate(date);
    //TODO: send notification to users (note: prisma update many doesn't return the updated records)
  }
}
