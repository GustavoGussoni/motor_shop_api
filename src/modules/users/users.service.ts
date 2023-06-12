import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
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

  remove(id: string) {
    const findUser = this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }

    return this.userRepository.delete(id);
  }
}
