import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  cellphone: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  is_admin: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  is_advertiser: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password: string;

  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  address: {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: number;
    addOn?: string;
  };
}
