import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/decorators/roles.decorator';
import { RoleEnum } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new HttpException('Access denied', HttpStatus.UNAUTHORIZED);
    }
    const hasRole = user.roles.some((role: RoleEnum) =>
      requiredRoles.includes(role),
    );
    if (!hasRole) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
    return true
  }
}
