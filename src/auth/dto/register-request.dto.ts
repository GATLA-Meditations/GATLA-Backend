import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  patientCode: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  constructor(patientCode: string, password: string) {
    this.patientCode = patientCode;
    this.password = password;
  }
}
