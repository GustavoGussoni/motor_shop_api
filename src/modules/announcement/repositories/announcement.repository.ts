import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { PaginationParamsDto } from '../dto/paginate-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { Announcement } from '../entities/announcement.entity';

export abstract class AnnouncementRepository {
  abstract create(
    data: CreateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> | Announcement;
  abstract findAll(
    page: PaginationParamsDto,
    perPage: PaginationParamsDto,
  ): Promise<Announcement[]> | Announcement[];
  abstract findOne(id: string): Promise<Announcement> | Announcement;
  abstract update(
    id: string,
    data: UpdateAnnouncementDto,
    userId: string,
  ): Promise<Announcement> | Announcement;
  abstract remove(id: string, userId: string): Promise<void> | void;
}
