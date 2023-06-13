import { randomUUID } from 'node:crypto';

export class Announcement {
  readonly id: string;
  name_car: string;
  brand: string;
  model: string;
  year: string;
  fuel: number;
  kilometers: number;
  color: string;
  price_fipe: number;
  price: number;
  description: string;
  cover_image: string;
  readonly userId: string;

  constructor() {
    this.id = randomUUID();
  }
}
