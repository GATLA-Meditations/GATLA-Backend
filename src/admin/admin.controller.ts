import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('streak')
@UseGuards(JwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
