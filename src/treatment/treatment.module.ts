import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TreatmentRepository } from './treatment.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TreatmentController],
  providers: [TreatmentService, TreatmentRepository, PrismaService],
})
export class TreatmentModule {}
