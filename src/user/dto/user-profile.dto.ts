import { SimpleAchievementDto } from '../../achievement/dto/simple-achievement.dto';

export class UserProfileDto {
  patientCode: string;
  image: string;
  achievements: SimpleAchievementDto[];

  constructor(patientCode: string, image: string, achievements: SimpleAchievementDto[]) {
    this.patientCode = patientCode;
    this.image = image;
    this.achievements = achievements;
  }
}
