import { HttpException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(login: LoginRequestDto) {
    const user = await this.authRepository.findUserByPatientCode(
      login.patientCode,
    );
    if (!user) throw new HttpException('User not found', 404);
    if (!this.comparePassword(login.password, user.password))
      throw new HttpException('Invalid Credentials', 401);
    const jwt = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    return new JwtDto(jwt);
  }

  private comparePassword(password: string, hash: string) {
    //TODO use bcrypt
    return password === hash;
  }
}
