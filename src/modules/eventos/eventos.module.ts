import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './services/eventos.service';
import { EventosController } from './controllers/eventos.controller';
import { Evento } from './entities/evento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evento]), // Registra la entidad Evento
  ],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [TypeOrmModule], // Exporta TypeOrmModule si otros módulos lo necesitan
})
export class EventosModule {}
