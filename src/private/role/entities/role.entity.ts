import { Column, Entity, ManyToMany } from "typeorm";
import { RoleNombre } from "./role.enum";
import { UserEntity } from "private/user/entities/user.entity";
import { Generique } from "common/generique/generique";

@Entity({name: 'role'})

export class RoleEntity extends Generique{

    @Column({type: 'varchar', length: 10, nullable: false,unique:true})
    roleName:RoleNombre;

    @ManyToMany(type=>UserEntity,user=>user.roles)
    users:UserEntity[];

}
