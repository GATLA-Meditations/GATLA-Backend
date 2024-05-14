import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { ApiTags } from '@nestjs/swagger';
import { TreatmentDto } from './dto/treatment.dto';

@Controller('treatment')
@ApiTags('Treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}
  @Get(':id')
  @HttpCode(200)
  async getTreatmentById(@Param('id') id: string): Promise<TreatmentDto> {
    return this.treatmentService.getTreatmentById(id);
  }
}
