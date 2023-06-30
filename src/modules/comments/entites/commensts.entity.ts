import { randomUUID } from 'node:crypto';

export class Comments {
  readonly id: string;
  comments: string;
  readonly announcementId: string;

  readonly created_at: Date 

  constructor() {
    this.id = randomUUID();
  }
}