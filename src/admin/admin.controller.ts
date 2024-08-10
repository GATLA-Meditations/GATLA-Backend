import { Body, Controller, HttpCode, Post, Put, UseGuards, Request, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminData } from './dto/AdminData';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateAdmin } from './dto/updateAdmin';

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
  async updateAdmin(@Request() req: any, @Body() adminData: UpdateAdmin) {
    const id = req.admin.id;
    return this.adminService.updateAdmin(id, adminData);
  }

  @Delete()
  @HttpCode(204)
  async deleteAdmin(@Request() req: any) {
    const id = req.user.id;
    return this.adminService.deleteAdmin(id);
  }
}
