import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from '../entities/evento.entity';
import { CreateEventoDto, UpdateEventoDto } from '../dto/evento.dto';

@Injectable()
export class EventosService {
  private readonly logger = new Logger('EventosService');

  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find({
      relations: ['user'],
      order: { id: 'ASC' },
    });
  }

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    try {
      const evento = this.eventoRepository.create(createEventoDto);
      return await this.eventoRepository.save(evento);
    } catch (error) {
      this.handleDBException(error); // Esta función lanza la excepción adecuada
    }
    // Por seguridad, aunque no debería llegar aquí
    throw new InternalServerErrorException('Error creando el evento');
  }

  async createSeed(data: Partial<Evento>): Promise<Evento> {
    const evento = this.eventoRepository.create(data);
    return this.eventoRepository.save(evento);
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOneBy({ id });
    if (!evento) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
    return evento;
  }

  async update(id: number, updateDto: UpdateEventoDto): Promise<Evento> {
    const evento = await this.findOne(id); // Se asegura que exista
    this.eventoRepository.merge(evento, updateDto);
    try {
      return await this.eventoRepository.save(evento);
    } catch (error) {
      this.handleDBException(error);
    }
    throw new InternalServerErrorException('Error actualizando el evento');
  }

  async remove(id: number): Promise<{ message: string }> {
    const exists = await this.eventoRepository.exist({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
    await this.eventoRepository.softDelete(id);
    return { message: `Evento ${id} eliminado correctamente` };
  }

  async deleteAllEventos(): Promise<any> {
    const query = this.eventoRepository.createQueryBuilder();
    return query.delete().where({}).execute();
  }

  private handleDBException(error: any): never {
    if (error.code === '23505') {
      // Violación de restricción de unicidad (duplicados)
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error interno del servidor');
  }
}
