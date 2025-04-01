import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ClientesService } from '../services/clientes.service';
import { Customer } from '../entities/cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll(): Promise<Customer[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    const customer = await this.clientesService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  @Post()
  create(@Body() customer: Customer): Promise<Customer> {
    return this.clientesService.create(customer);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() customer: Partial<Customer>): Promise<Customer> {
    return this.clientesService.update(id, customer);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.clientesService.remove(id);
  }
}