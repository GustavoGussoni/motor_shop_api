import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { Announcement } from '../entities/announcement.entity';

export abstract class AnnouncementRepository {
  abstract create(
    data: CreateAnnouncementDto,
  ): Promise<Announcement> | Announcement;
  abstract findAll(): Promise<Announcement[]> | Announcement[];
  abstract findOne(id: string): Promise<Announcement> | Announcement;
  abstract update(
    id: string,
    data: UpdateAnnouncementDto,
  ): Promise<Announcement> | Announcement;
  abstract remove(id: string): Promise<void> | void;
}
