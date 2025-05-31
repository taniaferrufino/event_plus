import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../../auth/entities/user.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaFin: Date;

  @Column({ length: 255, nullable: true })
  ubicacion: string;

  @Column({ type: 'int', default: 0 })
  capacidad: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'timestamp', default: () => 'now()' })
  creadoEn: Date;

  @Column({ type: 'timestamp', default: () => 'now()' })
  actualizadoEn: Date;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.eventos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}