import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateICommentsDto } from './dto/update-comments';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':announcementId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Param('announcementId') announcementId: string,
    @Body() createCommentsDto: CreateCommentsDto,
    @Request() req,
  ) {
    return this.commentsService.create(
      createCommentsDto,
      announcementId,
      req.user.id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') commentId: string,
    @Body() updateCommentsDto: UpdateICommentsDto,
    @Request() req,
  ) {
    return this.commentsService.update(
      commentId,
      updateCommentsDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') commentId: string, @Request() req): Promise<void> {
    await this.commentsService.delete(commentId, req.user.id);
  }
}
