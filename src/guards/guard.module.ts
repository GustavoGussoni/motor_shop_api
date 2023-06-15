import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { AnnouncementModule } from 'src/modules/announcement/announcement.module';
import { OwnerGuard } from './is-owner.guard';

@Module({
  imports: [AnnouncementModule, UsersModule],
  providers: [OwnerGuard],
})
export class GuardModule {}
