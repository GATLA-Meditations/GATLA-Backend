import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}
  @Get(':id')
  @HttpCode(200)
  async getTreatmentById(@Param('id') id: string) {
    return this.treatmentService.getTreatmentById(id);
  }
}
