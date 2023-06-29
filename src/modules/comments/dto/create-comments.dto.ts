import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentsDto {
  @IsString()
  @IsNotEmpty()
  comments: string;
}
