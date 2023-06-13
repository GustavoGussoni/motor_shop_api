import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAnnouncementDto } from '../../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../../dto/update-announcement.dto';
import { Announcement } from '../../entities/announcement.entity';
import { AnnouncementRepository } from '../announcement.repository';

@Injectable()
export class AnnouncementPrismaRepository implements AnnouncementRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = new Announcement();
    Object.assign(announcement, {
      ...data,
    });

    const newAnnouncement = await this.prisma.announcement.create({
      data: { ...announcement, userId: '1' },
    });

    return plainToInstance(Announcement, newAnnouncement);
  }
  async findAll(): Promise<Announcement[]> {
    const announcements = await this.prisma.announcement.findMany();
    return plainToInstance(Announcement, announcements);
  }
  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id },
    });
    return plainToInstance(Announcement, announcement);
  }

  async update(id: string, data: UpdateAnnouncementDto): Promise<Announcement> {
    const announcement = await this.prisma.announcement.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Announcement, announcement);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.announcement.delete({
      where: { id },
    });
  }
}
