import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../prisma.service';
import { ActivityModule } from 'src/activity/activity.module';
import { ModuleModule } from 'src/module/module.module';
import { MailService } from 'src/mail/mail.service';
import { TreatmentModule } from 'src/treatment/treatment.module';
import { NotificationModule } from '../notification/notification.module';
import { AuthModule } from '../auth/auth.module';
import { FriendsModule } from '../friends/friends.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService, MailService],
  exports: [AdminService],
  imports: [ActivityModule, ModuleModule, TreatmentModule, NotificationModule, AuthModule, FriendsModule],
})
export class AdminModule {}
