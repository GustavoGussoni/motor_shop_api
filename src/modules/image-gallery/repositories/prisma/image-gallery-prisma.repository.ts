import { Injectable } from '@nestjs/common';
import { ImageGalleryRepository } from '../image-gallery.repository';
import { CreateImageGalleryDto } from '../../dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from '../../dto/update-image-gallery.dto';
import { ImageGallery } from '../../entities/image-gallery.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ImageGalleryPrismaRepository implements ImageGalleryRepository {
  constructor(private prisma: PrismaService) {}
  create(data: CreateImageGalleryDto): ImageGallery | Promise<ImageGallery> {
    throw new Error('Method not implemented.');
  }
  findAll(): ImageGallery[] | Promise<ImageGallery[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): ImageGallery | Promise<ImageGallery> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    data: UpdateImageGalleryDto,
  ): ImageGallery | Promise<ImageGallery> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
