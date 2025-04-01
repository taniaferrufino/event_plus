import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from '../entities/eventos.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async obtenerTodos(): Promise<Evento[]> {
    return this.eventoRepository.find();
  }

  async obtenerPorId(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  async crear(evento: Evento): Promise<Evento> {
    const nuevoEvento = this.eventoRepository.create(evento);
    return this.eventoRepository.save(nuevoEvento);
  }

  async actualizar(id: number, evento: Evento): Promise<Evento> {
    await this.eventoRepository.update(id, evento);
    const eventoActualizado = await this.eventoRepository.findOne({ where: { id } });
    if (!eventoActualizado) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado después de la actualización`);
    }
    return eventoActualizado;
  }

  async eliminar(id: number): Promise<void> {
    await this.eventoRepository.delete(id);
  }
}
