import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAnnouncementDto } from '../../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../../dto/update-announcement.dto';
import { Announcement } from '../../entities/announcement.entity';
import { AnnouncementRepository } from '../announcement.repository';
import { ImageGallery } from 'src/modules/image-gallery/entities/image-gallery.entity';
import { PaginationParamsDto } from '../../dto/paginate-announcement.dto';

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

  private groupdBy(announcements: Announcement[], key: string) {
    return announcements.reduce((acc, curr) => {
      (acc[curr[key]] = acc[curr[key]] || []).push(curr);
      return acc;
    }, {});
  }

  async findAll(
    page: PaginationParamsDto,
    perPage: PaginationParamsDto,
    group: string,
    brand: string,
    model: string,
    color: string,
    year: string,
    fuel: string,
    kilometers: string,
    price: string,
  ): Promise<object | Announcement[]> {
    let queryPage: number = Number(page.page) || 1;
    queryPage = page.page <= 0 ? 1 : page.page;

    let queryPerPage: number = Number(perPage.perPage) || 12;
    queryPerPage =
      perPage.perPage < 1 || perPage.perPage > 12 ? 12 : queryPerPage;

    if (brand !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: { brand },
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
      return announcements;
    }

    if (brand && model !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: {
          brand,
          AND: {
            model,
          },
        },
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
      return announcements;
    }

    if (brand && model && color !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: {
          brand,
          AND: {
            model,
            color,
          },
        },
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
      return announcements;
    }

    if (brand && model && color && year !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: {
          year,
          AND: {
            brand,
            model,
            color,
          },
        },
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
      return announcements;
    }

    if (brand && model && color && year && fuel !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: { fuel },
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
      return announcements;
    }

    if (brand && model && color && year && fuel && kilometers !== undefined) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: { kilometers: Number(kilometers) },
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
      return announcements;
    }

    if (
      brand &&
      model &&
      color &&
      year &&
      fuel &&
      kilometers &&
      price !== undefined
    ) {
      const announcements = await this.prisma.announcement.findMany({
        skip: queryPage,
        take: queryPerPage,
        where: { price: Number(price) },
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
      return announcements;
    }
    const allAnnouncement = await this.prisma.announcement.findMany({
      skip: queryPage,
      take: queryPerPage,
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

    if (group) {
      const groups = this.groupdBy(allAnnouncement, group);

      return groups;
    }
    return allAnnouncement;
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
