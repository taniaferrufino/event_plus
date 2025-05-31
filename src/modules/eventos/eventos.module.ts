import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosController } from './controllers/eventos.controller';
import { EventosService } from './services/eventos.service';
import { ExcelService } from '../../exel/excel.service';
import { Evento } from './entities/evento.entity'; // ajusta ruta

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],  // <-- Esto es clave para inyectar el repositorio
  controllers: [EventosController],
  providers: [EventosService, ExcelService],
  exports: [EventosService],
})
export class EventosModule {}
