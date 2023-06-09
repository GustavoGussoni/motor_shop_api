import { CreateImageGalleryDto } from '../dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from '../dto/update-image-gallery.dto';
import { ImageGallery } from '../entities/image-gallery.entity';

export abstract class ImageGalleryRepository {
  abstract create(
    data: CreateImageGalleryDto,
  ): Promise<ImageGallery> | ImageGallery;
  abstract findAll(): Promise<ImageGallery[]> | ImageGallery[];
  abstract findOne(id: string): Promise<ImageGallery> | ImageGallery;
  abstract update(
    id: string,
    data: UpdateImageGalleryDto,
  ): Promise<ImageGallery> | ImageGallery;
  abstract remove(id: string): Promise<void> | void;
}
