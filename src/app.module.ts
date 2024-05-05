import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionaireModule } from './questionaire/questionnaire.module';

@Module({
  imports: [QuestionaireModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
