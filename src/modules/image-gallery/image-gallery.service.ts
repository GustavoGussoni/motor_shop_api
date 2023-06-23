import { Injectable } from '@nestjs/common';
import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';
import { ImageGalleryRepository } from './repositories/image-gallery.repository';

@Injectable()
export class ImageGalleryService {
  constructor(private imageRepository: ImageGalleryRepository) {}
  async create(createImageGalleryDto: CreateImageGalleryDto) {
    return 'This action adds a new imageGallery';
  }

  async findByImage(image: string) {
    return this.imageRepository.findByImage(image);
  }

  async findAll() {
    return `This action returns all imageGallery`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} imageGallery`;
  }

  async update(id: string, updateImageGalleryDto: UpdateImageGalleryDto) {
    return `This action updates a #${id} imageGallery`;
  }

  async remove(id: string) {
    return `This action removes a #${id} imageGallery`;
  }
}
