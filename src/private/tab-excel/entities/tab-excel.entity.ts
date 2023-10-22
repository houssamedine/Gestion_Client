import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"export_tab_excel"})
export class TabExcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  age: number;

  @Column()
  salaire: number;

  @Column()
  last_Month:Date;
}
