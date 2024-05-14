import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionnaireSubmissionModule } from './questionnaire-submission/submission.module';
import { TreatmentModule } from './treatment/treatment.module';
import { ModuleModule } from './module/module.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    QuestionnaireModule,
    QuestionnaireSubmissionModule,
    TreatmentModule,
    ModuleModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
