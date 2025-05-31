import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service'; // ajusta la ruta si es necesario

@Module({
  providers: [ExcelService],
  exports: [ExcelService],  // exporta para que otros módulos puedan usarlo
})
export class ExcelModule {}

