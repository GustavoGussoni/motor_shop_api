import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';

@Module({
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
})
export class ImageGalleryModule {}
