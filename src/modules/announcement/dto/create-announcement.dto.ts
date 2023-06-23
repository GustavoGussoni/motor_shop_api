import { ApiProperty } from '@nestjs/swagger';
import { ImageGallery } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  IsInt,
  Max,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  model: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  brand: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  @IsInt()
  @Min(1)
  @Max(3)
  @IsNotEmpty()
  fuel: number;

  @IsInt()
  @Min(0)
  @Max(999999)
  @IsNotEmpty()
  kilometers: number;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  price_fipe: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  is_activate: boolean;

  @IsString()
  @IsNotEmpty()
  cover_image: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ default: [] })
  image_gallery?: ImageGallery[];
}
