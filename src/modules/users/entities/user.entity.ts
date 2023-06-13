import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  birthdate: Date;
  description: string;
  is_admin: boolean;
  is_advertiser: boolean;

  @Exclude()
  password: string;

  @Exclude()
  readonly addressId: string;

  // address: {
  //   readonly id: string;
  //   cep: string;
  //   state: string;
  //   city: string;
  //   street: string;
  //   number: number;
  //   addOn: string;

  // };

  constructor() {
    this.id = randomUUID();
  }
}

export class Address {
  readonly id: string;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  addOn: string;

  constructor() {
    this.id = randomUUID();
  }
}
