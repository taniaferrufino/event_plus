import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesController } from './controllers/notificaciones.controller';
import { NotificacionesService } from './services/notificaciones.service';
import { Notificacion } from './entities/notificaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion])],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
})
export class NotificacionesModule {}
