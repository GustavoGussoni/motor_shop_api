import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Address, User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    const address = new Address();
    Object.assign(address, {
      ...data.address,
    });

    const newAddress = await this.prisma.address.create({
      data: { ...address },
    });

    delete data.address;

    const user = new User();
    Object.assign(user, {
      ...data,
      birthdate: new Date(data.birthdate),
    });

    const newUser = await this.prisma.user.create({
      data: { ...user, addressId: newAddress.id },
      include: { address: true },
    });

    return plainToInstance(User, newUser);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
      include: { announcement: true },
    });

    return user;
  }
  findAll(): User[] | Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return plainToInstance(User, user);
  }
  update(id: string, data: UpdateUserDto): User | Promise<User> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
