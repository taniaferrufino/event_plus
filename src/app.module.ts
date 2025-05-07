import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { EventosModule } from './modules/eventos/eventos.module';
import { ValoracionesModule } from './modules/valoraciones/valoraciones.module';
import { EntradasModule } from './modules/entradas/entradas.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';
import { Evento } from './modules/eventos/entities/evento.entity';
import { Valoracion } from './modules/valoraciones/entities/valoraciones.entity';
import { Entrada } from './modules/entradas/entities/entradas.entity';
import { Notificacion } from './modules/notificaciones/entities/notificaciones.entity';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
      envFilePath: '.env', // Ruta al archivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        port: configService.get<number>('DATABASE_PORT') || 5432,
        username: configService.get<string>('DATABASE_USER') || 'postgres',
        password: configService.get<string>('DATABASE_PASSWORD') || 'password',
        database: configService.get<string>('DATABASE_NAME') || 'event_plus',
        entities: [Evento, Valoracion, Entrada, Notificacion, User], // Agrega todas las entidades aquí
        synchronize: true, // ¡No uses esto en producción! Solo para desarrollo
      }),
    }),
    ClientesModule,
    EventosModule,
    ValoracionesModule,
    EntradasModule,
    NotificacionesModule,
    SeedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
