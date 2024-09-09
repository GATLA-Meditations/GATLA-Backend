

export class WeeklyDto {
  streak: number;
  maxStreak: number;
  weeklyWatchTime: number;
  totalWatchTime: number;

  constructor(streak: number, maxStreak: number, weeklyWatchTime: number, totalWatchTime: number) {
    this.streak = streak;
    this.maxStreak = maxStreak;
    this.weeklyWatchTime = weeklyWatchTime;
    this.totalWatchTime = totalWatchTime;
  }
}
