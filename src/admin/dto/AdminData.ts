import { IsNotEmpty } from 'class-validator';

export class AdminData {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;

  constructor(patientCode: string, password: string, name: string) {
    this.email = patientCode;
    this.password = password;
    this.name = name;
  }
}
