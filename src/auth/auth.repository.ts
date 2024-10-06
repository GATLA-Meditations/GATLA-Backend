import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByPatientCode(patientCode: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        patient_code: patientCode,
      },
      include: {
        streak: true,
      },
    });

    if (user && !user.streak) {
      await this.prisma.streak.create({
        data: {
          user: { connect: { id: user.id } },
          type: patientCode,
        },
      });

      // Fetch the user again with the newly created streak
      return this.prisma.user.findUnique({
        where: {
          patient_code: patientCode,
        },
        include: {
          streak: true,
        },
      });
    }

    return user;
  }

  async createUser(data: RegisterRequestDto) {
    return this.prisma.user.create({
      data: {
        patient_code: data.patientCode,
        password: data.password,
      },
    });
  }

  async findAdminByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
  }
}
