import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventosService } from '../services/eventos.service';
import { Evento } from '../entities/eventos.entity';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get()
  async obtenerTodos(): Promise<Evento[]> {
    return this.eventosService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number): Promise<Evento> {
    return this.eventosService.obtenerPorId(id);
  }

  @Post()
  async crear(@Body() evento: Evento): Promise<Evento> {
    return this.eventosService.crear(evento);
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() evento: Evento): Promise<Evento> {
    return this.eventosService.actualizar(id, evento);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number): Promise<void> {
    return this.eventosService.eliminar(id);
  }
}
