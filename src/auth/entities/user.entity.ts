import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Evento } from '../../modules/eventos/entities/evento.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Column('text', { select: false })
  password?: string;

  @Column({ name: 'fullName', type: 'text' })
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({ type: 'text', array: true, default: '{user}' })
  roles: string[];

  @OneToMany(() => Evento, (evento: Evento) => evento.user)
  eventos: Evento[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
