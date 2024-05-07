import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionnaireSubmissionModule } from './questionnaire-submission/submission.module';

@Module({
  imports: [QuestionnaireModule, QuestionnaireSubmissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
