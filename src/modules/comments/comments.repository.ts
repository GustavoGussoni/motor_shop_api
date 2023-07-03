import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateICommentsDto } from './dto/update-comments';
import { Comments } from './entites/commensts.entity';

export abstract class CommentsRepository {
  abstract create(
    data: CreateCommentsDto,
    announcementId: string,
    userId: string,
  ): Promise<Comments> | Comments;
  abstract findOne(id: string): Promise<Comments> | Comments;
  abstract update(
    id: string,
    data: UpdateICommentsDto,
    userId: string,
  ): Promise<Comments> | Comments;
  abstract delete(id: string): Promise<void>;
}
