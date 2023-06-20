import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAnnouncementDto } from '../../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../../dto/update-announcement.dto';
import { Announcement } from '../../entities/announcement.entity';
import { AnnouncementRepository } from '../announcement.repository';
import { ImageGallery } from 'src/modules/image-gallery/entities/image-gallery.entity';

@Injectable()
export class AnnouncementPrismaRepository implements AnnouncementRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> {
    const {
      name_car,
      brand,
      year,
      fuel,
      kilometers,
      color,
      price_fipe,
      price,
      description,
      cover_image,
      is_activate,
      image_gallery,
    } = data;

    const announcement = new Announcement();
    Object.assign(announcement, {
      name_car,
      brand,
      year,
      fuel,
      kilometers,
      color,
      price_fipe,
      price,
      description,
      cover_image,
      is_activate,
    });

    const newAnnouncement = await this.prisma.announcement.create({
      data: { ...announcement, userId },
      include: { image_gallery: true },
    });

    image_gallery?.map(async (imageObj) => {
      const image = new ImageGallery();
      Object.assign(image, {
        ...imageObj,
      });

      await this.prisma.imageGallery.create({
        data: { ...image, announcementId: newAnnouncement.id },
      });
    });

    return plainToInstance(Announcement, newAnnouncement);
  }
  async findAll(): Promise<Announcement[]> {
    const announcements = await this.prisma.announcement.findMany({
      include: {
        user: {
          select: {
            name: true,
            description: true,
            is_advertiser: true,
          },
        },
      },
    });
    return plainToInstance(Announcement, announcements);
  }
  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    return plainToInstance(Announcement, announcement);
  }

  async update(id: string, data: UpdateAnnouncementDto): Promise<Announcement> {
    const {
      name_car,
      brand,
      year,
      fuel,
      kilometers,
      color,
      price_fipe,
      price,
      description,
      cover_image,
      is_activate,
    } = data;
    const announcement = await this.prisma.announcement.update({
      where: { id },
      data: {
        name_car,
        brand,
        year,
        fuel,
        kilometers,
        color,
        price_fipe,
        price,
        description,
        cover_image,
        is_activate,
      },
    });

    return plainToInstance(Announcement, announcement);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.announcement.delete({
      where: { id },
    });
  }
}
