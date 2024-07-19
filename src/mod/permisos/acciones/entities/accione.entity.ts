import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Modulo } from '../../../modulos/entities/modulos.entity';
import { Admin } from 'src/mod/usuarios/admin/entities/admin.entity';

@Entity('mod_permisos_acciones')
export class AccionesModule {
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

  @ManyToOne(() => Admin, (admin) => admin.id)
  user: Modulo

  @ManyToOne(() => Modulo, (modulo) => modulo.id)
  modulo: Modulo
}
