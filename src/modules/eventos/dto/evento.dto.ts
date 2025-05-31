import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsInt()
  capacidad?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class UpdateEventoDto extends PartialType(CreateEventoDto) {}
