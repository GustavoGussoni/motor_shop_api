import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationParamsDto } from './dto/paginate-announcement.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('announcements')
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Request() req) {
    const userId = req.user.id;
    return this.announcementService.create(createAnnouncementDto, userId);
  }

  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'indica a numeração da página escolhida',
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    description: 'indica quantos objetos virão por página',
    required: false,
  })
  @ApiQuery({
    name: 'group',
    type: String,
    description: 'indica a marca dos carros o qual deseja receber',
    required: false,
  })
  @Get()
  async findAll(
    @Query('page')
    page: PaginationParamsDto,
    @Query('perPage')
    perPage: PaginationParamsDto,
    @Query('group') group: string | undefined,
    @Query('brand') brand: string | undefined,
    @Query('model') model: string | undefined,
    @Query('color') color: string | undefined,
    @Query('year') year: string | undefined,
    @Query('fuel') fuel: string | undefined,
    @Query('kilometer') kilometer: string | undefined,
    @Query('price') price: string | undefined,
  ) {
    return await this.announcementService.findAll(
      page,
      perPage,
      group,
      brand,
      model,
      color,
      year,
      fuel,
      kilometer,
      price,
    );
  }

  @Get(':announcementId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('announcementId') id: string) {
    return this.announcementService.findOne(id);
  }

  @Patch(':announcementId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('announcementId') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @Request() req,
  ) {
    return this.announcementService.update(
      id,
      updateAnnouncementDto,
      req.user.id,
    );
  }

  @HttpCode(204)
  @Delete(':announcementId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('announcementId') id: string, @Request() req) {
    return this.announcementService.remove(id, req.user.id);
  }
}
