import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AdminData } from './dto/AdminData';

@Controller('admin')
@UseGuards(JwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @HttpCode(200)
  async async(@Body() adminData: AdminData) {
    return await this.adminService.createAdmin(adminData);
  }
}
