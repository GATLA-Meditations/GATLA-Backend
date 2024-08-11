import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionnaireSubmissionModule } from './questionnaire-submission/submission.module';
import { TreatmentModule } from './treatment/treatment.module';
import { ModuleModule } from './module/module.module';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { UserModule } from './user/user.module';
import { StreakModule } from './streak/streak.module';
import { AchievementModule } from './achievement/achievement.module';
import { IngameDataModule } from './ingamedata/ingamedata.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
      isGlobal: true,
    }),
    QuestionnaireModule,
    QuestionnaireSubmissionModule,
    TreatmentModule,
    ModuleModule,
    ActivityModule,
    AuthModule,
    UserModule,
    StreakModule,
    AchievementModule,
    IngameDataModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
