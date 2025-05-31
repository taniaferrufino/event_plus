import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Res, // Eliminado porque ya no se usa para exportar Excel
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
// import { Response } from 'express'; // Eliminado
//import { Auth } from '../auth/decorators';
//import { ValidRoles } from '../auth/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
 //@Auth(ValidRoles.admin)
  create(@Body() createSeedDto: CreateSeedDto) {
    return this.seedService.create(createSeedDto);
  }

  @Get()
 //@Auth(ValidRoles.admin)
  findAll() {
    return this.seedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeedDto: UpdateSeedDto) {
    return this.seedService.update(+id, updateSeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seedService.remove(+id);
  }

  // Eliminado el endpoint de exportar eventos con Excel
}
