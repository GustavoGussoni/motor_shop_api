import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCommentsDto } from './create-comments.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateICommentsDto extends PartialType(CreateCommentsDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  comments: string;
}
