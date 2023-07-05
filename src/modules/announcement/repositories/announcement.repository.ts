import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { Announcement } from '../entities/announcement.entity';

export abstract class AnnouncementRepository {
  abstract create(
    data: CreateAnnouncementDto,
    userId: string,
    advertiser: boolean,
  ): Promise<Announcement> | Announcement;
  abstract findAll(
    page: number,
    perPage: number,
    group: string | undefined,
    filters: any,
  ): Promise<Announcement[]> | Announcement[] | object;
  abstract findOne(id: string): Promise<Announcement> | Announcement;
  abstract update(
    id: string,
    data: UpdateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> | Announcement;
  abstract remove(id: string): Promise<void> | void;
}
