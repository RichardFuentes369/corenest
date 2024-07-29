import { Admin } from '../../../usuarios/admin/entities/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_permisos_modulo_asignacion')
export class Asignacion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  nombre_permiso: string;

  @Column({ nullable: true })
  modulo_padre_id: number;

  @Column({ nullable: true })
  user_id: number;
  
  @ManyToOne(() => Asignacion, { nullable: true })
  @JoinColumn({ name: 'modulo_padre_id' })
  modulo_padre: Asignacion;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: Admin;
}