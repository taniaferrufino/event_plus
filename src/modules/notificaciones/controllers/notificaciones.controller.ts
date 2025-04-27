import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificacionesService } from '../services/notificaciones.service';
import { CreateNotificacionDto } from '../dto/notificaciones.dto';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  create(@Body() createNotificacionDto: CreateNotificacionDto) {
    return this.notificacionesService.create(createNotificacionDto);
  }

  @Get()
  findAll() {
    return this.notificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionesService.findOne(+id);
  }

  @Patch(':id/leida')
  markAsRead(@Param('id') id: string) {
    return this.notificacionesService.markAsRead(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacionesService.remove(+id);
  }
}
