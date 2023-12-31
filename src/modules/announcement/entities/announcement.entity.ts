import { randomUUID } from 'node:crypto';

export class Announcement {
  readonly id: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
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
