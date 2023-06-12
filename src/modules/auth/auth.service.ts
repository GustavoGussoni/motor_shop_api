import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersRepository) {}

  validateUser = (email: string, password: string) => {
    const user = this.usersRepository.findByEmail(email);

    const matchUser = compare(password, user.password);

    if (matchUser) {
      return { email: user.email };
    }

    return null;
  };
}
