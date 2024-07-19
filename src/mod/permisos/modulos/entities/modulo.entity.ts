import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Modulo } from '../../../modulos/entities/modulos.entity';
import { Admin } from 'src/mod/usuarios/admin/entities/admin.entity';

@Entity('mod_permisos_modulos')
export class PermisosModulos {

  // Columnas

  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  tipo: number;

  @Column()
  nombre: string;

  @Column()
  userId: number;

  @Column()
  moduloId: number;

  @Column({nullable: true})
  submoduloId: number;

  // Relaciones
  @ManyToOne(() => Modulo, (modulo) => modulo.id)
  modulo: Modulo

  @ManyToOne(() => PermisosModulos, (permisosModulo) => permisosModulo.modulo.id)
  submodulo: PermisosModulos
  
  @ManyToOne(() => Admin, (admin) => admin.id)
  user: Modulo


}
