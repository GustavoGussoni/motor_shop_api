import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsRepository } from './repositories/comments.repository';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { AnnouncementRepository } from '../announcement/repositories/announcement.repository';
import { UpdateICommentsDto } from './dto/update-comments';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(
    createCommentsDto: CreateCommentsDto,
    announcementId: string,
    userId: string,
  ) {
    const comments = await this.commentsRepository.create(
      createCommentsDto,
      announcementId,
      userId,
    );

    return comments;
  }

  async update(
    commentId: string,
    updateCommentsDto: UpdateICommentsDto,
    userId: string,
  ) {
    const comment = await this.commentsRepository.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    if (comment.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this comment!',
      );
    }

    const updatedComment = await this.commentsRepository.update(
      commentId,
      updateCommentsDto,
      userId,
    );
    return updatedComment;
  }

  async delete(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentsRepository.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    if (comment.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment!',
      );
    }

    await this.commentsRepository.delete(commentId);
  }
}
