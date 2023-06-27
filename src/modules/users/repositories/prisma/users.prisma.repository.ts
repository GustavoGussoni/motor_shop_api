import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { Address, User } from '../../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { hashSync } from 'bcryptjs';

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
    });

    const newUser = await this.prisma.user.create({
      data: { ...user, addressId: newAddress.id },
      include: { address: true },
    });

    return plainToInstance(User, newUser);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { announcement: true },
    });

    return user;
  }

  async findByToken(token: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { reset_token: token },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        address: true
      }
    });
    return users;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return plainToInstance(User, user);
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const { address, ...rest } = data;

    const userUpdate = await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
      },
    });

    const findUser = await this.prisma.user.findUnique({
      where: { id },
    });

    const newAddress = await this.prisma.address.update({
      where: { id: findUser.addressId },
      data: { ...address },
    });

    const findUserReturn = await this.prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });

    return plainToInstance(User, findUserReturn);
  }
  async updateToken(email: string, resetToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { reset_token: resetToken },
    });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: hashSync(password, 10), reset_token: null },
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
