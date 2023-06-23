import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcement.repository';

@Injectable()
export class AnnouncementService {
  constructor(private announcementRepository: AnnouncementRepository) {}
  async create(createAnnouncementDto: CreateAnnouncementDto, userId: string) {
    const announcement = await this.announcementRepository.create(
      createAnnouncementDto,
      userId,
    );

    return announcement;
  }

  async findAll() {
    const announcements = await this.announcementRepository.findAll();
    return announcements;
  }

  async findOne(id: string) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return announcement;
  }

  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
    userId: string,
  ) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }

    const announcementUpdate = await this.announcementRepository.update(
      id,
      updateAnnouncementDto,
      userId,
    );
    return announcementUpdate;
  }

  async remove(id: string, userId: string) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    await this.announcementRepository.remove(id, userId);
    return;
  }
}
