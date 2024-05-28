import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  patientCode: string;
  @IsNotEmpty()
  password: string;

  constructor(patientCode: string, password: string) {
    this.patientCode = patientCode;
    this.password = password;
  }
}
