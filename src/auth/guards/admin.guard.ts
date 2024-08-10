import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new ForbiddenException('No authorization header');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    try {
      // Verify the token and decode the payload
      const payload = this.jwtService.verify(token);

      // Check if the payload contains a role element
      if (payload.role) {
        return false;
      }

      // Check if the payload contains the role and if it is "ADMIN"
      if (payload.role === 'ADMIN') {
        request.user = payload; // Attach the payload to the request object
        return true;
      } else {
        throw new ForbiddenException('Insufficient permissions');
      }
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
