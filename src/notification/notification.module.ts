import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
