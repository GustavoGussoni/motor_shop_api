import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AnnouncementService } from 'src/modules/announcement/announcement.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly announcementService: AnnouncementService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const announcementId = request.params.id;

    const findAnnouncement = await this.announcementService.findOne(
      announcementId,
    );

    console.log(findAnnouncement, userId);

    if (findAnnouncement.userId !== userId) {
      throw new UnauthorizedException('Not Owner');
    }

    return true;
  }
}
