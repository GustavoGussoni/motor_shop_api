import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { ImageGalleryModule } from './modules/image-gallery/image-gallery.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GuardModule } from './guards/guard.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    AnnouncementModule,
    ImageGalleryModule,
    UsersModule,
    AuthModule,
    GuardModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
