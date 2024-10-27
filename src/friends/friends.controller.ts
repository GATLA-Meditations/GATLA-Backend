import { Body, Controller, Delete, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @UseGuards(AdminGuard)
  @Put('add/:userId/:friendId')
  @HttpCode(200)
  async addFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
    return await this.friendsService.addFriend(userId, friendId);
  }

  @UseGuards(AdminGuard)
  @Delete('delete/:userId/:friendId')
  @HttpCode(200)
  async deleteFriend(@Param('userId') userId: string, @Param('friendId') friendId: string) {
    return await this.friendsService.deleteFriend(userId, friendId);
  }

  @UseGuards(JwtGuard)
  @Post('notify-friends')
  @HttpCode(200)
  async notifyFriends(@Request() req: any, @Body() messageData: { title: string; content: string }) {
    const userId = req.user.userId;
    return await this.friendsService.notifyFriends(userId, messageData);
  }

  @UseGuards(JwtGuard)
  @Post('congratulate-friend/:friendId')
  @HttpCode(200)
  async congratulateFriend(@Request() req: any, @Param('friendId') friendId: string, @Body('message') message: string) {
    const userId = req.user.userId;
    return await this.friendsService.congratulateFriend(userId, friendId, message);
  }
}
