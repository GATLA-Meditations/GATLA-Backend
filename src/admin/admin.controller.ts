import { Body, Controller, HttpCode, Post, Put, UseGuards, Request, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminData } from './dto/AdminData';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateAdmin } from './dto/updateAdmin';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
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

  @Post('treatment/create')
  @HttpCode(200)
  async createTreatment(@Body() treatmentData: { name: string; description: string }) {
    return await this.adminService.createTreatment(treatmentData);
  }

  @Put('treatment/update/:id')
  @HttpCode(200)
  async updateTreatment(@Param('id') id: string, @Body() treatmentData?: { name?: string; description?: string }) {
    return this.adminService.updateTreatment(id, treatmentData);
  }

  @Put('treatment/update/modules/:id')
  @HttpCode(204)
  async updateModulesFromTreatment(@Param('id') id: string, @Body() modules: { id: string; order: number }[]) {
    return this.adminService.updateModulesFromTreatment(id, modules);
  }

  @Post('module/create')
  @HttpCode(200)
  async createModule(@Body() moduleData: { name: string; description: string }) {
    return await this.adminService.createModule(moduleData);
  }

  @Put('module/update/:id')
  @HttpCode(200)
  async updateModule(@Param('id') id: string, @Body() moduleData: { name?: string; description?: string }) {
    return await this.adminService.updateModule(id, moduleData);
  }

  @Put('module/update/activities/:id')
  @HttpCode(204)
  async updateActivitiesFromModules(@Param('id') id: string, @Body() activitiesData: { id?: string; order?: number }[]) {
    return await this.adminService.updateActivitiesFromModules(id, activitiesData);
  }
}
