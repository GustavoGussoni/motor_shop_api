import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comments: string;
}
