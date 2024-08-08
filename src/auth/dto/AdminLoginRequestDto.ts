import { IsNotEmpty } from 'class-validator';

export class AdminLoginRequestDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;

  constructor(patientCode: string, password: string) {
    this.email = patientCode;
    this.password = password;
  }
}
