import { Body, Controller, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { NotificationMessageDto } from './dto/notification-message.dto';
import { NotificationTokenDto } from './dto/notification-token.dto';

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

  @Post('send')
  @HttpCode(200)
  async sendPushNotification(@Body() message: NotificationMessageDto) {
    return await this.notificationService.sendPushNotification(message);
  }

  @Post('token')
  @HttpCode(201)
  async saveToken(@Request() req: any, @Body() token: NotificationTokenDto) {
    const user_id: string = req.user.userId;
    return await this.notificationService.saveToken(user_id, token);
  }

  @Get()
  @HttpCode(200)
  async getNotifications(@Request() req: any) {
    const user_id: string = req.user.userId;
    return this.notificationService.getNotificationsByUserId(user_id);
  }

  @Put('mark-as-read/:id')
  @HttpCode(200)
  async markNotificationAsRead(@Param('id') notificationId: string) {
    return this.notificationService.markNotificationAsRead(notificationId);
  }
}
