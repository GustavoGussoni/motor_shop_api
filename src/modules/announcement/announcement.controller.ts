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
    const advertiser = req.user.is_advertiser;
    return this.announcementService.create(
      createAnnouncementDto,
      userId,
      advertiser,
    );
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
    description: 'Utilizado para retornar em grupos',
    required: false,
  })
  @ApiQuery({
    name: 'brand',
    type: String,
    description: 'Filtro por tipos de marcas',
    required: false,
  })
  @ApiQuery({
    name: 'model',
    type: String,
    description: 'Filtro por modelo dos veículos',
    required: false,
  })
  @ApiQuery({
    name: 'color',
    type: String,
    description: 'Filtro por cor dos veículos',
    required: false,
  })
  @ApiQuery({
    name: 'year',
    type: String,
    description: 'Filtro por ano dos veículos',
    required: false,
  })
  @ApiQuery({
    name: 'fuel',
    type: String,
    description: 'Filtro por tipo de combustível do veículo',
    required: false,
  })
  @ApiQuery({
    name: 'kilometers',
    type: String,
    description: 'Filtro por quilometragem',
    required: false,
  })
  @ApiQuery({
    name: 'price',
    type: String,
    description: 'Filtro por valor',
    required: false,
  })
  @ApiQuery({
    name: 'price_fipe',
    type: String,
    description: 'Filtro por valor da tabela fipe',
    required: false,
  })
  @Get()
  async findAll(
    @Query('page')
    page: number,
    @Query('perPage')
    perPage: number,
    @Query('group') group: string,
    @Query('brand') brand: string,
    @Query('model') model: string,
    @Query('color') color: string,
    @Query('year') year: string,
    @Query('fuel') fuel: string,
    @Query('kilometers') kilometers: string,
    @Query('price') price: string,
    @Query('price_fipe') price_fipe: string,
  ) {
    const filters = {
      brand,
      model,
      color,
      year,
      fuel,
      kilometers,
      price,
      price_fipe,
    };
    return await this.announcementService.findAll(
      page,
      perPage,
      group,
      filters,
    );
  }

  @Get(':announcementId')
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
