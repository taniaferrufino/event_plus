import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('eventos') // Nombre de la tabla en la base de datos
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true }) // Ahora es opcional
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: true }) // Ahora es opcional
  fechaInicio: Date;

  @Column({ type: 'timestamp', nullable: true }) // Ahora es opcional
  fechaFin: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ubicacion: string;

  @Column({ type: 'int', default: 0, nullable: true }) // Ahora es opcional
  capacidad: number;

  @Column({ type: 'boolean', default: true, nullable: true }) // Ahora es opcional
  activo: boolean;

  @CreateDateColumn({ nullable: true }) // Ahora es opcional
  creadoEn: Date;

  @UpdateDateColumn({ nullable: true }) // Ahora es opcional
  actualizadoEn: Date;
}