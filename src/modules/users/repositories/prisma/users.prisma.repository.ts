import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const user = new User();    
    Object.assign(user, {
        ...data,
        birthdate: new Date(data.birthdate),
    });
    const newUser = await this.prisma.user.create({
      data: { ...user },
    });
    console.log(newUser)
    return plainToInstance(User, newUser);
  }
  findAll(): User[] | Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): User | Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: UpdateUserDto): User | Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
