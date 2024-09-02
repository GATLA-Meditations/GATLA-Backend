import { Body, Controller, Get, HttpCode, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('Notification')
@UseGuards(JwtGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('settings')
  @HttpCode(200)
  async getNotificationSettingsById(@Request() req: any) {
    const user_id: string = req.user.userId;
    return await this.notificationService.getNotificationSettingsById(user_id);
  }

  @Put('settings')
  @HttpCode(200)
  async UpdateNotificationSettingsById(
    @Request() req: any,
    @Body()
    notificationSettings: {
      meditationNotifications: boolean;
      motivationalNotifications: boolean;
      phrasesNotifications: boolean;
    },
  ) {
    const user_id: string = req.user.userId;
    return await this.notificationService.updateNotificationSettingsById(user_id, notificationSettings);
  }
}
