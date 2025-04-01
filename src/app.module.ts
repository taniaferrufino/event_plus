import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as 'postgres') || 'postgres',
      host: process.env.DB_HOST || 'localhost', // Valor predeterminado
      port: parseInt(process.env.DB_PORT || '5432', 10), // Valor predeterminado
      username: process.env.DB_USERNAME || 'default_username', // Valor predeterminado
      password: process.env.DB_PASSWORD || 'default_password', // Valor predeterminado
      database: process.env.DB_DATABASE || 'default_database', // Valor predeterminado
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo, no usar en producción
    }),
    ClientesModule,
  ],
})
export class AppModule {}