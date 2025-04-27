import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Valoracion } from '../entities/valoraciones.entity';
import { CreateValoracionDto } from '../dto/valoraciones.dto';

@Injectable()
export class ValoracionesService {
  constructor(
    @InjectRepository(Valoracion)
    private readonly valoracionRepository: Repository<Valoracion>,
  ) {}

  async create(createValoracionDto: CreateValoracionDto): Promise<Valoracion> {
    const valoracion = this.valoracionRepository.create(createValoracionDto);
    return this.valoracionRepository.save(valoracion);
  }

  async findAll(): Promise<Valoracion[]> {
    return this.valoracionRepository.find();
  }

  async findOne(id: number): Promise<Valoracion | null> {
    return this.valoracionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.valoracionRepository.delete(id);
  }
}
