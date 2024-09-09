import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaService } from '../prisma.service';
import { ActivityModule } from 'src/activity/activity.module';
import { ModuleModule } from 'src/module/module.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService],
  exports: [AdminService],
  imports: [ActivityModule, ModuleModule],
})
export class AdminModule {}
