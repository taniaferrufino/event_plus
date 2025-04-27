import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoracionesController } from './controllers/valoraciones.controller';
import { ValoracionesService } from './services/valoraciones.service';
import { Valoracion } from './entities/valoraciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Valoracion])],
  controllers: [ValoracionesController],
  providers: [ValoracionesService],
})
export class ValoracionesModule {}
