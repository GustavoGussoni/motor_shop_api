import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from '../comments.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentsDto } from '../../dto/create-comments.dto';
import { Comments } from '../../entites/commensts.entity';

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateCommentsDto,
    announcementId: string,
  ): Promise<Comments> {
    const announcement = await this.prisma.announcement.findUnique({
      where: { id: announcementId },
    });

    if (!announcement) {
      throw new NotFoundException('Annoucement not found!');
    }

    const comments = new Comments();
    Object.assign(comments, {
      ...data,
    });

    const newComments = await this.prisma.comments.create({
      data: { ...comments, announcementId },
    });

    return newComments;
  }
}
