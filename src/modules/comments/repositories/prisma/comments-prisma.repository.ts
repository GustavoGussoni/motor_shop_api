import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from '../comments.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCommentsDto } from '../../dto/create-comments.dto';
import { Comments } from '../../entites/commensts.entity';
import { UpdateICommentsDto } from '../../dto/update-comments';

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: CreateCommentsDto,
    announcementId: string,
    userId: string,
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
      data: { ...comments, announcementId, userId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return newComments;
  }

  async findOne(commentId: string): Promise<Comments> {
    return this.prisma.comments.findUnique({
      where: { id: commentId },
      include: { user: { select: { name: true } } },
    });
  }

  async update(
    id: string,
    data: UpdateICommentsDto,
    userId: string,
  ): Promise<Comments> {
    const updatedComment = await this.prisma.comments.update({
      where: { id },
      data,
      include: { user: { select: { name: true } } },
    });

    return updatedComment;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.comments.delete({
      where: { id },
    });
  }
}
