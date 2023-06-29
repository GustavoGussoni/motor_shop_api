import { PartialType } from '@nestjs/swagger';
import { CreateCommentsDto } from './create-comments.dto';

export class UpdateImageGalleryDto extends PartialType(CreateCommentsDto) {}