import { Body, Controller, Get, HttpCode, Param, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  @Put('subscribe-to-treatment/:treatmentId/:delayed')
  async subscribeToTreatment(
    @Param('treatmentId') treatmentId: string,
    @Param('delayed') delayed: boolean,
    @Request() req: any,
  ): Promise<any> {
    const userId = req.user.userId;
    return await this.userService.subscribeToTreatment(userId, treatmentId, delayed);
  }

  @Get('homestats')
  @HttpCode(200)
  async getUserIngameData(@Request() req: any): Promise<any> {
    const id: string = req.user.userId;
    return await this.userService.getUserIngameData(id);
  }

  @Put('changepass')
  @HttpCode(200)
  async changeUserPassword(@Body() password: ChangePasswordDto, @Request() req: any) {
    const id: string = req.user.userId;
    return await this.userService.changeUserPassword(id, password);
  }

  @Get('profile')
  @HttpCode(200)
  async getUserProfile(@Request() req: any) {
    const id: string = req.user.userId;
    return await this.userService.getUserProfile(id);
  }

  @Get('shop-items')
  @HttpCode(200)
  async getUserItems(@Request() req: any) {
    const id: string = req.user.userId;
    return await this.userService.getUserItems(id);
  }
}
