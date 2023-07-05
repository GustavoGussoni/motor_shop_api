import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcement.repository';

@Injectable()
export class AnnouncementService {
  constructor(private announcementRepository: AnnouncementRepository) {}
  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    userId: string,
    advertiser: boolean,
  ) {
    if (!advertiser) {
      throw new UnauthorizedException('Permission has been denied');
    }

    const announcement = await this.announcementRepository.create(
      createAnnouncementDto,
      userId,
      advertiser,
    );

    return announcement;
  }

  async findAll(
    page: number,
    perPage: number,
    group: string | undefined,
    filters: any,
  ) {
    const announcements = await this.announcementRepository.findAll(
      page,
      perPage,
      group,
      filters,
    );

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

    if (announcement.userId != userId) {
      throw new UnauthorizedException('Permission has been denied');
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

    if (announcement.userId != userId) {
      throw new UnauthorizedException('Permission has been denied');
    }

    return await this.announcementRepository.remove(id);
  }
}
