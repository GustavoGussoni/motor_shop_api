import { CreateCommentsDto } from '../dto/create-comments.dto';
import { Comments } from '../entites/commensts.entity';

export abstract class CommentsRepository {
  abstract create(
    data: CreateCommentsDto,
    announcementId: string,
    userId: string
  ): Promise<Comments> | Comments;
}