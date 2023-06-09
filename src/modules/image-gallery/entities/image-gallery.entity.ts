import { randomUUID } from 'node:crypto';

export class ImageGallery {
  readonly id: string;
  image: string;
  readonly announcementId: string;

  constructor() {
    this.id = randomUUID();
  }
}
