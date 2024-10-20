import { HttpException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from './dto/jwt.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import * as bcrypt from 'bcrypt';
import { AdminLoginRequestDto } from './dto/AdminLoginRequestDto';
import { StreakRespository } from '../streak/streak.respository';

@Injectable()
export class AuthService {
  constructor(
    private readonly streakRepository: StreakRespository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(login: LoginRequestDto) {
    const user = await this.authRepository.findUserByPatientCode(login.patientCode);
    if (!user) throw new HttpException('User not found', 404);
    if (!(await this.comparePassword(login.password, user.password))) throw new HttpException('Invalid Credentials', 401);
    const jwt = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );

    const today = new Date();
    const lastUpdate = new Date(user.streak.lastUpdate);

    // Check if the last update was done on a different day
    const isSameDay =
      lastUpdate.getFullYear() === today.getFullYear() &&
      lastUpdate.getMonth() === today.getMonth() &&
      lastUpdate.getDate() === today.getDate();

    //Update streak
    if (!isSameDay) await this.streakRepository.incrementStreak(user.id, 1);

    return new JwtDto(jwt);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async registerUser(registerRequest: RegisterRequestDto) {
    // Check if user already exists
    const user = await this.authRepository.findUserByPatientCode(registerRequest.patientCode);
    if (user) throw new HttpException('User already exists', 409);

    // Hash the user's password before saving it
    const hashedPassword = await this.hashPassword(registerRequest.password);

    // Create a new user with the hashed password
    const newUser = {
      ...registerRequest,
      password: hashedPassword,
    };

    // Save the user in the repository
    return await this.authRepository.createUser(newUser);
  }

  // Method to hash the password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt (higher is more secure but slower)
    return await bcrypt.hash(password, saltRounds);
  }

  public async adminLogin(login: AdminLoginRequestDto) {
    const admin = await this.authRepository.findAdminByEmail(login.email);
    if (!admin) throw new HttpException('Admin not found', 404);
    if (!(await this.comparePassword(login.password, admin.password))) throw new HttpException('Invalid Credentials', 401);
    const jwt = await this.jwtService.signAsync(
      {
        sub: admin.id,
        role: 'ADMIN',
      },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    return new JwtDto(jwt);
  }
}
