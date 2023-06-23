import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';
import { randomUUID } from 'node:crypto';
import { MailService } from 'src/utils/mail.service';
@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const findUser = this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUser = this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    await this.userRepository.delete(id);
    return;
  }

  async sendEmailResetPassword(email: string) {
    const findUser = await this.userRepository.findByEmail(email);
    if (!findUser) {
      throw new NotFoundException('User not found.');
    }

    const resetToken = randomUUID();

    await this.userRepository.updateToken(email, resetToken);

    const resetPasswordTemplate = this.mailService.resetPasswordTemplate(
      email,
      findUser.name,
      resetToken,
    );

    await this.mailService.sendEmail(resetPasswordTemplate);
  }

  async resetPassword(reset_token: string, password: string) {
    const findUser = await this.userRepository.findByToken(reset_token);
    if (!findUser) {
      throw new NotFoundException('User not found.');
    }

    await this.userRepository.updatePassword(findUser.id, password);
  }
}
