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

    if (image_gallery) {
      const image = new ImageGallery();
      const createImage = image_gallery.map(async (imageObj) => {
        Object.assign(image, {
          ...imageObj,
        });
        const imageAdded = await this.prisma.imageGallery.create({
          data: { ...imageObj, announcementId: newAnnouncement.id },
        });
      });
    }

    const findAnnouncement = await this.prisma.announcement.findUnique({
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

  async findAll(
    page: number,
    perPage: number,
    group: string,
    filters: any,
  ): Promise<object | Announcement[]> {
    page = Number(page) || 1;
    page = page <= 0 ? 1 : page;

    perPage = Number(perPage) || 12;
    perPage = perPage < 1 || perPage > 12 ? 12 : perPage;

    if (typeof filters.kilometers === 'string') {
      filters['kilometers'] = Number(filters.kilometers);
    }
    if (typeof filters.price === 'string') {
      filters['price'] = Number(filters.price);
    }
    if (typeof filters.price_fipe === 'string') {
      filters['price_fipe'] = Number(filters.price_fipe);
    }

    const keys = Object.keys(filters).filter(
      (key) => filters[key] !== undefined,
    );

    const totalCount = await this.prisma.announcement.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalCount / perPage);

    const result = await this.prisma.announcement.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      where: filters,
      orderBy: {
        model: 'asc',
      },
      include: {
        user: {
          select: {
            name: true,
            description: true,
            is_advertiser: true,
          },
        },
        comments: {
          select: {
            id: true,
            comments: true,
            created_at: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        image_gallery: {
          select: {
            image: true
          }
        }
      },
    });

    let prevUrl = `http://localhost:3000/announcement?page=${
      page - 1
    }&perPage=${perPage}`;

    let nextUrl = `http://localhost:3000/announcement?page=${
      page + 1
    }&perPage=${perPage}`;

    if (keys.length > 0) {
      const values = keys.map((key) => `&${key}=${filters[key]}`);
      prevUrl += values.join('');
      nextUrl += values.join('');
    }

    let prevPage = page > 1 ? prevUrl : null;

    let nextPage = page < totalPages ? nextUrl : null;

    return {
      prevPage,
      nextPage,
      count: totalCount,
      data: result,
    };
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
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
            id: true,
          },
        },
        comments: {
          select: {
            id: true,
            comments: true,
            created_at: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return plainToInstance(Announcement, announcement);
  }

  async update(id: string, data: UpdateAnnouncementDto): Promise<Announcement> {
    const { image_gallery, ...rest } = data;
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
