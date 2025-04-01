import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/eventos.entity';
import { EventosService } from './services/eventos.service';
import { EventosController } from './controllers/eventos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])], // Registra la entidad aquí
  providers: [EventosService],
  controllers: [EventosController],
})
export class EventosModule {}
