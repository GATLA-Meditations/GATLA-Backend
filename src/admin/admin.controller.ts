import { Body, Controller, HttpCode, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminData } from './dto/AdminData';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @HttpCode(200)
  async createAdmin(@Body() adminData: AdminData) {
    return await this.adminService.createAdmin(adminData);
  }

  @Put()
  @HttpCode(200)
  async updateAdmin() {}
}
