import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { AdminLoginRequestDto } from './dto/AdminLoginRequestDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: LoginRequestDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('admin/login')
  @HttpCode(200)
  async adminLogin(@Body() adminLoginDto: AdminLoginRequestDto) {
    return this.authService.adminLogin(adminLoginDto);
  }
}
