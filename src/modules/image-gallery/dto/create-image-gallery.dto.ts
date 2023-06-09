import { IsString, IsNotEmpty } from 'class-validator';

export class CreateImageGalleryDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  announcementId: string;
}
