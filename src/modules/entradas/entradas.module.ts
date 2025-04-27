import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradasController } from './controllers/entradas.controller';
import { EntradasService } from './services/entradas.service';
import { Entrada } from './entities/entradas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrada])],
  controllers: [EntradasController],
  providers: [EntradasService],
})
export class EntradasModule {}
