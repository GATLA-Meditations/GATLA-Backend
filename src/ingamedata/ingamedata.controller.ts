import { Controller, HttpCode, Param, Put, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { IngameDataService } from './ingamedata.service';

@UseGuards(JwtGuard)
@Controller('ingamedata')
export class IngameDataController {
  constructor(private readonly ingameDataService: IngameDataService) {}

  @Put('streak')
  @HttpCode(200)
  async updateMaxStreak(@Request() req: any, @Param('maxStreak') maxStreak: number) {
    const id: string = req.user.userId;
    return await this.ingameDataService.updateMaxStreak(id, maxStreak);
  }
}
