import { Module, forwardRef } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AnnouncementRepository } from './repositories/announcement.repository';
import { AnnouncementPrismaRepository } from './repositories/prisma/announcement-prisma.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementService,
    PrismaService,
    {
      provide: AnnouncementRepository,
      useClass: AnnouncementPrismaRepository,
    },
  ],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
