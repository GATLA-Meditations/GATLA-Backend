import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../prisma.service';
import { ActivityModule } from 'src/activity/activity.module';
import { ModuleModule } from 'src/module/module.module';
import { MailService } from 'src/mail/mail.service';
import { TreatmentModule } from 'src/treatment/treatment.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService, MailService],
  exports: [AdminService],
  imports: [ActivityModule, ModuleModule, TreatmentModule],
})
export class AdminModule {}
