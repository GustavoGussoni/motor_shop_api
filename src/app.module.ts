import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { ImageGalleryModule } from './modules/image-gallery/image-gallery.module';

@Module({
  imports: [AnnouncementModule, ImageGalleryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
