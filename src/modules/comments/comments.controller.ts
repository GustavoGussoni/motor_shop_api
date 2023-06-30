import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService){}


  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(@Param('id') announcementId: string, @Body() createCommentsDto: CreateCommentsDto, @Request() req){
    return this.commentsService.create(createCommentsDto, announcementId, req.user.id)
  }
}
