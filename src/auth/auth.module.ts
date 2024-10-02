import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../../config/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StreakModule } from 'src/streak/streak.module';
import { StreakService } from 'src/streak/streak.service';

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
    StreakModule,
  ],
  providers: [AuthService, AuthRepository, PrismaService, JwtStrategy],
})
export class AuthModule {}
