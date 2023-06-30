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
  IsEnum,
  NotEquals,
} from 'class-validator';
import { FuelEnum } from '../enum/fuel-type.enum';

export class CreateAnnouncementDto {
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  model: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  brand: string;

  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  year: string;

  @IsEnum(FuelEnum)
  @IsNotEmpty()
  readonly fuel: FuelEnum;

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
