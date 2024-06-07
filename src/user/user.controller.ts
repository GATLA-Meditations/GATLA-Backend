import { Controller, Get, UseGuards, Request, Put } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('actual-module')
  async getActualModule(@Request() req: any): Promise<any> {
    const id = req.user.userId;
    return await this.userService.getActualModule(id);
  }

  @Put('subscribe-to-treatment/:treatmentId')
  async subscribeToTreatment(@Request() req: any): Promise<any> {
    const userId = req.user.userId;
    const treatmentId = req.params.treatmentId;
    return await this.userService.subscribeToTreatment(userId, treatmentId);
  }
}
