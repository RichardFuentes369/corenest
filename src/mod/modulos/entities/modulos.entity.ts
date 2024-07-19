import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_modulos')
export class Modulo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  icono: string;

  @Column({ unique: true })
  url: string;
} 
