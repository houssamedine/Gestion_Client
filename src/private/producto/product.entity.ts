import { Generique } from "common/generique/generique";
import { Column, Entity } from "typeorm";

@Entity({name: 'product'})
export class ProductEntity extends Generique{

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    nombre: string;

    @Column({type: 'float', nullable: false})
    precio: number;
}