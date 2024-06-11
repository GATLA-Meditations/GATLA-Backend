import { Controller, Get, UseGuards, Request, HttpCode, Put, Param } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('actual-module')
  async getActualModule(@Request() req: any): Promise<any> {
    const id = req.user.userId;
    return await this.userService.getActualModule(id);
  }

  @Get('homestats')
  @HttpCode(200)
  async getUserIngameData(@Request() req: any): Promise<any> {
    const id: string = req.user.userId;
    return await this.userService.getUserIngameData(id);
  }

  @Put('changepass')
  @HttpCode(200)
  async changeUserPassword(@Param('password') password: string, @Request() req: any) {
    const id: string = req.user.userId;
    return await this.userService.changeUserPassword(id, password);
  }
}
