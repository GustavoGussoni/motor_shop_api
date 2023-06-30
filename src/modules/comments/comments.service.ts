import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { AnnouncementRepository } from '../announcement/repositories/announcement.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository
  ) {}

  async create(createCommentsDto: CreateCommentsDto, announcementId: string, userId: string) {

    const comments = await this.commentsRepository.create(
      createCommentsDto,
      announcementId,
      userId
    );

    return comments;
  }
}
