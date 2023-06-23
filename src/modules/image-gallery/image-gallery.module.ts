import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ImageGalleryRepository } from './repositories/image-gallery.repository';
import { ImageGalleryPrismaRepository } from './repositories/prisma/image-gallery-prisma.repository';

@Module({
  controllers: [ImageGalleryController],
  providers: [
    ImageGalleryService,
    PrismaService,
    { provide: ImageGalleryRepository, useClass: ImageGalleryPrismaRepository },
  ],
})
export class ImageGalleryModule {}
