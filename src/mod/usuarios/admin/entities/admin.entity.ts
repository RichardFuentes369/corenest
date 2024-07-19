import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { AccionesModule } from 'src/mod/permisos/acciones/entities/accione.entity';
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

  @OneToMany(() => PermisosModulos, (permiso) => permiso.userId)
  permiso: PermisosModulos

  @OneToMany(() => AccionesModule, (permiso) => permiso.userId)
  acciones: AccionesModule
}