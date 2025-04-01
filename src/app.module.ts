import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EventosModule } from './modules/eventos/eventos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost', // Valor predeterminado
      port: parseInt(process.env.DATABASE_PORT || '5432', 10), // Valor predeterminado
      username: process.env.DATABASE_USER || 'postgres', // Valor predeterminado
      password: process.env.DATABASE_PASSWORD || 'admin25', // Valor predeterminado
      database: process.env.DATABASE_NAME || 'eventPlus', // Valor predeterminado
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo, no usar en producción
    }),
    ClientesModule,
    EventosModule,
  ],
})
export class AppModule {}