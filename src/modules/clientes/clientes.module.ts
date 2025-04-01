import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './controllers/clientes.controller';
import { ClientesService } from './services/clientes.service';
import { Customer } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
