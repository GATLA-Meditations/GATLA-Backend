import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterRequestDto } from './dto/register-request.dto';

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

  async createUser(data: RegisterRequestDto) {
    return this.prisma.user.create({
      data: {
        patient_code: data.patientCode,
        password: data.password,
      },
    });
  }
}
