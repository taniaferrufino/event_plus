import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from '../entities/notificaciones.entity';
import { CreateNotificacionDto } from '../dto/notificaciones.dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ) {}

  async create(
    createNotificacionDto: CreateNotificacionDto,
  ): Promise<Notificacion> {
    const notificacion = this.notificacionRepository.create(
      createNotificacionDto,
    );
    return this.notificacionRepository.save(notificacion);
  }

  async findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find();
  }

  async findOne(id: number): Promise<Notificacion | null> {
    return this.notificacionRepository.findOneBy({ id });
  }

  async markAsRead(id: number): Promise<void> {
    await this.notificacionRepository.update(id, { leida: true });
  }

  async remove(id: number): Promise<void> {
    await this.notificacionRepository.delete(id);
  }
}
