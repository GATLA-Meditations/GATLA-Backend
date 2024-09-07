import { Controller, Get, HttpCode, Param, UseGuards, Request } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('module')
@ApiTags('Module')
@UseGuards(JwtGuard)
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':id')
  @HttpCode(200)
  async getModuleById(@Param('id') id: string, @Request() req: any) {
    return await this.moduleService.getModuleById(id, req.user.userId);
  }

  @UseGuards(AdminGuard)
  @Get('admin/:id')
  @HttpCode(200)
  async getModuleByIdAdmin(@Param('id') id: string) {
    return await this.moduleService.getModuleByIdForAdmin(id);
  }
}
