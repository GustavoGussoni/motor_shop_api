import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;
    console.log(userId);
    const announcementId = request.params.id;

    return await this.authService.validateOwner(userId, announcementId);
  }
}
