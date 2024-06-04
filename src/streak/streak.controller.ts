import { Controller, UseGuards } from '@nestjs/common';
import { StreakService } from './streak.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('streak')
@UseGuards(JwtGuard)
export class StreakController {
  constructor(private readonly streakService: StreakService) {}
}
