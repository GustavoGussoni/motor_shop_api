import { Injectable } from '@nestjs/common';
import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';

@Injectable()
export class ImageGalleryService {
  create(createImageGalleryDto: CreateImageGalleryDto) {
    return 'This action adds a new imageGallery';
  }

  findAll() {
    return `This action returns all imageGallery`;
  }

  findOne(id: string) {
    return `This action returns a #${id} imageGallery`;
  }

  update(id: string, updateImageGalleryDto: UpdateImageGalleryDto) {
    return `This action updates a #${id} imageGallery`;
  }

  remove(id: string) {
    return `This action removes a #${id} imageGallery`;
  }
}
