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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageGalleryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageGalleryDto: UpdateImageGalleryDto,
  ) {
    return this.imageGalleryService.update(id, updateImageGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageGalleryService.remove(id);
  }
}
