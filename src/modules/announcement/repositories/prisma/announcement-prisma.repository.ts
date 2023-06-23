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
    const { image_gallery, ...rest } = data;

    const announcement = new Announcement();
    Object.assign(announcement, {
      ...rest,
    });

    const newAnnouncement = await this.prisma.announcement.create({
      data: { ...announcement, userId },
    });

    const image = new ImageGallery();
    const createImage = image_gallery.map(async (imageObj) => {
      Object.assign(image, {
        ...imageObj,
      });
      const imageAdded = await this.prisma.imageGallery.create({
        data: { ...imageObj, announcementId: newAnnouncement.id },
      });
    });

    const findAnnouncement = await this.prisma.announcement.findUniqueOrThrow({
      where: { id: newAnnouncement.id },
      include: {
        image_gallery: {
          select: {
            image: true,
            id: true,
          },
        },
      },
    });

    return plainToInstance(Announcement, findAnnouncement);
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
        image_gallery: {
          select: {
            image: true,
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
    const { image_gallery, ...rest } = data;
    // const imageSearch = await this.prisma.imageGallery.findMany({
    //   where: { announcementId: id },
    // });
    // console.log(imageSearch);

    // const changeImage = image_gallery.map(async (imageObj) => {
    //   const imageUpdate = await this.prisma.imageGallery.update({
    //     where: {}
    //     data: { ...imageObj },
    //   });
    // });

    const announcement = await this.prisma.announcement.update({
      where: { id },
      data: {
        ...rest,
      },
      include: {
        image_gallery: {
          select: {
            image: true,
          },
        },
      },
    });

    const findAnnouncement = await this.prisma.announcement.findUniqueOrThrow({
      where: { id: announcement.id },
      include: {
        image_gallery: {
          select: {
            image: true,
            id: true,
          },
        },
      },
    });

    return plainToInstance(Announcement, findAnnouncement);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.announcement.delete({
      where: { id },
    });
  }
}
