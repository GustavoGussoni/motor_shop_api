import { Injectable } from '@nestjs/common';
import { ImageGalleryRepository } from '../image-gallery.repository';
import { CreateImageGalleryDto } from '../../dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from '../../dto/update-image-gallery.dto';
import { ImageGallery } from '../../entities/image-gallery.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ImageGalleryPrismaRepository implements ImageGalleryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateImageGalleryDto): Promise<ImageGallery> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<ImageGallery[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<ImageGallery> {
    throw new Error('Method not implemented.');
  }

  async findByImage(image: string): Promise<ImageGallery> {
    const imageSearch = await this.prisma.imageGallery.findFirst({
      where: { image: image },
    });

    return imageSearch;
  }

  async update(id: string, data: UpdateImageGalleryDto): Promise<ImageGallery> {
    const image = await this.prisma.imageGallery.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(ImageGallery, image);
  }
  async remove(id: string): Promise<void> {
    const image = await this.prisma.imageGallery.delete({
      where: { id },
    });
    return;
  }
}
