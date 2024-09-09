

export class WeeklyDto {
  moduleTitle: string;
  streak: number;
  maxStreak: number;
  weeklyWatchTime: number;
  totalWatchTime: number;

  constructor(moduleTitle: string, streak: number, maxStreak: number, weeklyWatchTime: number, totalWatchTime: number) {
    this.moduleTitle = moduleTitle;
    this.streak = streak;
    this.maxStreak = maxStreak;
    this.weeklyWatchTime = weeklyWatchTime;
    this.totalWatchTime = totalWatchTime;
  }
}
