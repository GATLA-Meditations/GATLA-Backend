import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  constructor(data: ChangePasswordDto) {
    this.password = data.password;
  }
}
