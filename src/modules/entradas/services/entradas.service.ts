import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrada } from '../entities/entradas.entity';
import { CreateEntradaDto } from '../dto/entradas.dto';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entrada)
    private readonly entradaRepository: Repository<Entrada>
  ) {}

  async create(createEntradaDto: CreateEntradaDto): Promise<Entrada> {
    const entrada = this.entradaRepository.create(createEntradaDto);
    return this.entradaRepository.save(entrada);
  }

  async findAll(): Promise<Entrada[]> {
    return this.entradaRepository.find();
  }

  async findOne(id: number): Promise<Entrada | null> {
    return this.entradaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.entradaRepository.delete(id);
  }
}
