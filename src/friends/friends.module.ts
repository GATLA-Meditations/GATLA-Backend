import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import FriendsRepository from './friends.repository';
import { PrismaService } from 'src/prisma.service';
import { FriendsController } from './friends.controller';
import { NotificationModule } from '../notification/notification.module';
import { AchievementModule } from '../achievement/achievement.module';

@Module({
  providers: [FriendsService, FriendsRepository, PrismaService],
  controllers: [FriendsController],
  exports: [FriendsService],
  imports: [NotificationModule, AchievementModule],
})
export class FriendsModule {}
