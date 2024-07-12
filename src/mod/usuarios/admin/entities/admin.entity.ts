import { Permisos } from 'src/mod/usuarios/permisos/entities/permisos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_usuarios_admin')
export class Admin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Permisos, (permiso) => permiso.userId)
  permiso: Permisos
}