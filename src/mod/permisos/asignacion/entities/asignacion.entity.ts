import { Admin } from '../../../usuarios/admin/entities/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('mod_permisos_modulo_asignacion')
export class Asignacion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  nombre_permiso: string;

  @ManyToOne(() => Asignacion, modulo => modulo.id, { nullable: true })
  modulo_padre: number;

  @ManyToOne(() => Admin, admin => admin.id)
  usuario: number;
}