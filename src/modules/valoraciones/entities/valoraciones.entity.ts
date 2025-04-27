import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('valoraciones')
export class Valoracion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usuarioId: number;

    @Column()
    eventoId: number;

    @Column({ type: 'int' })
    puntuacion: number;

    @Column({ type: 'text', nullable: true })
    comentario: string;
}