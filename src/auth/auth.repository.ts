import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByPatientCode(patientCode: string) {
    return this.prisma.user.findUnique({
      where: {
        patient_code: patientCode,
      },
    });
  }
}
