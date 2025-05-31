import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../entities/evento.entity';
import { Auth, GetUser } from '../../../auth/decorators';
import { ValidRoles } from '../../../auth/interfaces';
import { User } from '../../../auth/entities/user.entity';
import { ExcelService } from '../../../exel/excel.service';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateEventoDto, UpdateEventoDto } from '../dto/evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(
    private readonly eventosService: EventosService,
    private readonly excelService: ExcelService,
  ) {}

  @Get()
  async obtenerTodos(): Promise<any[]> {
    const eventos = await this.eventosService.findAll();
    return eventos.map(evento => ({
      id: evento.id,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fechaInicio: evento.fechaInicio,
      fechaFin: evento.fechaFin,
      ubicacion: evento.ubicacion,
      capacidad: evento.capacidad,
      activo: evento.activo,
      creadoEn: evento.creadoEn,
      actualizadoEn: evento.actualizadoEn,
      user: evento.user ? { // <-- Cambia 'usuario' por 'user'
        id: evento.user.id,
        nombre: evento.user.fullName, // o el campo que uses para el nombre
        email: evento.user.email,
        roles: evento.user.roles,
      } : null,
    }));
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventosService.findOne(id);
  }

  @Post()
  //@Auth(ValidRoles.admin)
  async crear(@Body() createEventoDto: CreateEventoDto): Promise<Evento> {
    try {
      return await this.eventosService.create(createEventoDto);
    } catch (error) {
      // Puedes manejar el error aquí o simplemente dejar que NestJS lo gestione
      throw error;
    }
  }


  @Put(':id')
  // @Auth(ValidRoles.admin)
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() eventoDto: UpdateEventoDto,
  ): Promise<Evento> {
    return this.eventosService.update(id, eventoDto);
  }

  @Delete(':id')
  //@Auth(ValidRoles.admin)
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.eventosService.remove(id);
  }

  @Get('exportar')
  async exportarEventos(@Res() res: Response): Promise<void> {
    try {
      const buffer = await this.excelService.exportarEventosAExcel();

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=eventos.xlsx');

      res.send(buffer);
    } catch (error) {
      console.error('Error al exportar eventos:', error);
      throw new InternalServerErrorException('No se pudo exportar los eventos.');
    }
  }
}
