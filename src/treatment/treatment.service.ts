import { HttpException, Injectable } from '@nestjs/common';
import { TreatmentRepository } from './treatment.repository';
import { TreatmentDto } from './dto/treatment.dto';
import { SimpleModuleDto } from '../module/dto/simple-module.dto';

@Injectable()
export class TreatmentService {
  constructor(private readonly treatmentRepository: TreatmentRepository) {}

  async getTreatmentById(id: string) {
    const treatment = await this.treatmentRepository.getTreatmentById(id);
    if (!treatment) throw new HttpException('Treatment not found', 404);
    return new TreatmentDto({
      ...treatment,
      modules: treatment.modules.map((treatmentModule) => new SimpleModuleDto(treatmentModule.module)),
    });
  }

  async getActualTreatmentByUserId(userId: string) {
    return await this.treatmentRepository.findActualTreatmentFromUser(userId);
  }
}
