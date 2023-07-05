import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('userId') id: string) {
    return this.usersService.remove(id);
  }

  @HttpCode(200)
  @Post('resetPassword')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async sendEmailResetPassword(@Body() resetPassword: ResetPasswordDto) {
    await this.usersService.sendEmailResetPassword(resetPassword.email);
    return { message: 'Token enviado com sucesso!' };
  }

  @Patch('resetPassword/:token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async resetPassword(
    @Param('token') token: string,
    @Body() UpdatePassword: UpdatePasswordDto,
  ) {
    await this.usersService.resetPassword(token, UpdatePassword.password);
    return { message: 'Senha redefinida com sucesso!' };
  }
}
