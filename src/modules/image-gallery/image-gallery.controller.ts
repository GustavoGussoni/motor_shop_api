import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images-gallery')
@Controller('image-gallery')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  @Post()
  create(@Body() createImageGalleryDto: CreateImageGalleryDto) {
    return this.imageGalleryService.create(createImageGalleryDto);
  }

  @Get()
  findAll() {
    return this.imageGalleryService.findAll();
  }

  @Get(':imageId')
  findOne(@Param('imageId') id: string) {
    return this.imageGalleryService.findOne(id);
  }

  @Patch(':imageId')
  update(
    @Param('imageId') id: string,
    @Body() updateImageGalleryDto: UpdateImageGalleryDto,
  ) {
    return this.imageGalleryService.update(id, updateImageGalleryDto);
  }

  @Delete(':imageId')
  remove(@Param('imageId') id: string) {
    return this.imageGalleryService.remove(id);
  }
}
