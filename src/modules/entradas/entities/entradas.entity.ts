import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('entradas')
export class Entrada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  eventoId: number;

  @Column({ type: 'decimal' })
  precio: number;

  @Column({ type: 'timestamp' })
  fechaCompra: Date;
}
