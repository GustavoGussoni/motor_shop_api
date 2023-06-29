import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService){}

  @Post(':id')
  create(@Param('id') announcementId: string, @Body() createCommentsDto: CreateCommentsDto, @Request() req){
    return this.commentsService.create(createCommentsDto, announcementId)
  }
}
