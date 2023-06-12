import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  description: string;
  is_admin: boolean;
  is_advertiser: boolean;

  @Exclude()
  password: string;
  readonly addressId: string;

  constructor() {
    this.id = randomUUID();
  }
}
