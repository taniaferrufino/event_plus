import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ValoracionesService } from '../services/valoraciones.service';
import { CreateValoracionDto } from '../dto/valoraciones.dto';

@Controller('valoraciones')
export class ValoracionesController {
  constructor(private readonly valoracionesService: ValoracionesService) {}

  @Post()
  create(@Body() createValoracionDto: CreateValoracionDto) {
    return this.valoracionesService.create(createValoracionDto);
  }

  @Get()
  findAll() {
    return this.valoracionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valoracionesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valoracionesService.remove(+id);
  }
}
