import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { ApiTags } from '@nestjs/swagger';
import { TreatmentDto } from './dto/treatment.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@UseGuards(JwtGuard || AdminGuard)
@Controller('treatment')
@ApiTags('Treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get(':id')
  @HttpCode(200)
  async getTreatmentById(@Param('id') id: string): Promise<TreatmentDto> {
    return this.treatmentService.getTreatmentById(id);
  }

  @Get('')
  @HttpCode(200)
  async getAllTreatments(): Promise<TreatmentDto[]> {
    return this.treatmentService.getAllTreatments();
  }
}
