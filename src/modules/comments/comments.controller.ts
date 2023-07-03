import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Param('id') announcementId: string,
    @Body() createCommentsDto: CreateCommentsDto,
    @Request() req,
  ) {
    return this.commentsService.create(
      createCommentsDto,
      announcementId,
      req.user.id,
    );
  }
}
