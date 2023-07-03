import { ApiProperty, PartialType } from '@nestjs/swagger';
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
import { CreateAnnouncementDto } from './create-announcement.dto';

export class UpdateAnnouncementDto extends PartialType(CreateAnnouncementDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(127)
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  year: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(FuelEnum)
  @IsNotEmpty()
  readonly fuel: FuelEnum;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999999)
  @IsNotEmpty()
  kilometers: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  price_fipe: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  is_activate: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cover_image: string;

  @ApiProperty({ default: [] })
  @IsArray()
  @IsOptional()
  image_gallery?: ImageGallery[];
}
