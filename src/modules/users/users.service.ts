import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findByEmail(createUserDto.email);
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    const findUser = this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return findUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
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
}
