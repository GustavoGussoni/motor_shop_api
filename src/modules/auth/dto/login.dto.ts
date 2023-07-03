import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Max(254)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
