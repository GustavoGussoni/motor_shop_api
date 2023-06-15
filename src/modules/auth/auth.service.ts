import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const matchUser = await compare(password, user.password);

      if (matchUser) {
        return { email: user.email };
      }

      throw new UnauthorizedException('Invalid password');
    }

    throw new UnauthorizedException('Invalid email');
  }

  async login(email: string) {
    const user = await this.usersService.findByEmail(email);
    return {
      token: this.jwtService.sign({ email: email }, { subject: user.id }),
    };
  }
}
