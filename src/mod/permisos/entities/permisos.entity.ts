import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Modulos } from './modulos.entity';
import { Admin } from 'src/mod/users/admin/entities/admin.entity';

@Entity()
export class Permisos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Admin, (admin) => admin.id)
  user: Modulos

  @ManyToOne(() => Modulos, (modulo) => modulo.id)
  modulo: Modulos
}
