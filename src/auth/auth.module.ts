import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../../config/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StreakRespository } from '../streak/streak.respository';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      load: [configuration],
    }),
  ],
  providers: [AuthService, AuthRepository, PrismaService, JwtStrategy, StreakRespository],
})
export class AuthModule {}
