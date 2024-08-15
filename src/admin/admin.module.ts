import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../prisma.service';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService],
  exports: [AdminService],
  imports: [ActivityModule],
})
export class AdminModule {}
