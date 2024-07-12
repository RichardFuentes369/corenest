import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_usuarios_modulos')
export class Modulo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  icono: string;
} 
