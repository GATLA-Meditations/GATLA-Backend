import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StreakService } from './streak.service';

@Controller('streak')
@UseGuards(AuthGuard)
export class StreakController {
  constructor(private readonly streakService: StreakService) {}
}
