import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Permisos } from './permisos.entity';

@Entity('mod_usuarios_modulos')
export class Modulos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  icono: string;

  @OneToMany(() => Permisos, (permiso) => permiso.modulo)
  permiso: Permisos
}
