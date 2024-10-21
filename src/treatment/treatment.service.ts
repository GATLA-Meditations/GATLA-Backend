import { HttpException, Injectable } from '@nestjs/common';
import { TreatmentRepository } from './treatment.repository';
import { TreatmentDto } from './dto/treatment.dto';
import { SimpleModuleDto } from '../module/dto/simple-module.dto';
import TreatmentCreateDto from './dto/treatment-create.dto';

@Injectable()
export class TreatmentService {
  constructor(private readonly treatmentRepository: TreatmentRepository) {}

  async getAllTreatments() {
    const treatments = await this.treatmentRepository.getAllTreatments();
    return treatments.map(
      (treatment) =>
        new TreatmentDto({
          ...treatment,
        }),
    );
  }

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

  async getUserTreatment(userId: string) {
    return await this.treatmentRepository.getUserTreatment(userId);
  }

  async updateStartQuestionnaireAnswers(userTreatmentId: string) {
    return await this.treatmentRepository.updateStartQuestionnaireAnswers(userTreatmentId);
  }

  async updateEndQuestionnaireAnswers(id: string) {
    return await this.treatmentRepository.updateEndQuestionnaireAnswers(id);
  }

  async createTreatment(treatmentData: TreatmentCreateDto) {
    return await this.treatmentRepository.createCompleteTreatment(treatmentData);
  }

  async createModule(id: string) {
    const treatment = await this.treatmentRepository.getTreatmentById(id);
    if (!treatment) throw new HttpException('Treatment not found', 404);
    return await this.treatmentRepository.createModule(id, treatment.modules.length);
  }

  async deleteTreatment(id: string) {
    const modules = await this.treatmentRepository.getModulesByTreatmentId(id);
    if (modules != null && modules.length > 0) {
      for (const module of modules) {
        if (!(await this.checkItHasNoUsers(module.module.id))) {
          throw new HttpException('Treatment has users', 400);
        }
        await this.treatmentRepository.deleteTreatmentModule(module.id);
        await this.treatmentRepository.deleteModuleIfHasNoConnections(module.module.id);
      }
    }
    return await this.treatmentRepository.deleteTreatment(id);
  }

  async checkItHasNoUsers(id: string) {
    const userModules = await this.treatmentRepository.getUserModulesByModuleId(id);
    return userModules == null || userModules.length === 0;
  }
}
