import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from '../modules/eventos/entities/evento.entity';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async exportarEventosAExcel(): Promise<Buffer> {
    try {
      const eventos = await this.eventoRepository.find();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Eventos');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Título', key: 'titulo', width: 30 },
        { header: 'Descripción', key: 'descripcion', width: 50 },
        { header: 'Fecha Inicio', key: 'fechaInicio', width: 20 },
        { header: 'Fecha Fin', key: 'fechaFin', width: 20 },
        { header: 'Ubicación', key: 'ubicacion', width: 30 },
        { header: 'Capacidad', key: 'capacidad', width: 10 },
        { header: 'Activo', key: 'activo', width: 10 },
        { header: 'Creado En', key: 'creadoEn', width: 20 },
        { header: 'Actualizado En', key: 'actualizadoEn', width: 20 },
        { header: 'User ID', key: 'user_id', width: 10 },
      ];

      eventos.forEach((evento) => {
        worksheet.addRow({
          id: evento.id,
          titulo: evento.titulo,
          descripcion: evento.descripcion,
          fechaInicio: evento.fechaInicio,
          fechaFin: evento.fechaFin,
          ubicacion: evento.ubicacion,
          capacidad: evento.capacidad,
          activo: evento.activo ? 'Sí' : 'No',
          creadoEn: evento.creadoEn,
          actualizadoEn: evento.actualizadoEn,
          user_id: evento.user_id,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      return Buffer.from(buffer);
    } catch (error) {
      throw new InternalServerErrorException('No se pudo generar el archivo Excel.');
    }
  }
}