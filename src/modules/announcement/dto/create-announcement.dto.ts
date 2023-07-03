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
} from 'class-validator';
import { FuelEnum } from '../enum/fuel-type.enum';

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsEnum(FuelEnum)
  @IsNotEmpty()
  readonly fuel: FuelEnum;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(999999)
  @IsNotEmpty()
  kilometers: number;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price_fipe: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  is_activate: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cover_image: string;

  @ApiProperty({ default: [] })
  @IsArray()
  @IsOptional()
  image_gallery?: ImageGallery[];
}
