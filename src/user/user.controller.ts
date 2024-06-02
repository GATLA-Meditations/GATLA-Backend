import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
}
