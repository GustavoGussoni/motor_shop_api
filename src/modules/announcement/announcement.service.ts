import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcement.repository';
import { PaginationParamsDto } from './dto/paginate-announcement.dto';

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

  async findAll(
    page: PaginationParamsDto,
    perPage: PaginationParamsDto,
    group: string | undefined,
    brand: string | undefined,
    model: string | undefined,
    color: string | undefined,
    year: string | undefined,
    fuel: string | undefined,
    kilometer: string | undefined,
    price: string | undefined,
  ) {
    const announcements = await this.announcementRepository.findAll(
      page,
      perPage,
      group,
      brand,
      model,
      color,
      year,
      fuel,
      kilometer,
      price,
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
