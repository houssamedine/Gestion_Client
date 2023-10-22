import { hash } from 'bcryptjs';
import { Generique } from 'common/generique/generique';
import { RoleEntity } from 'private/role/entities/role.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({name: 'user'})
export class UserEntity extends Generique {

    @Column({length: 10, nullable: false})
    firstName:string;

    @Column({length: 10, nullable: false})
    lastName:string;

    @Column({length: 10, nullable: false})
    _rol:string;

    @Column({length: 10, nullable: false, unique: true})
    userName:string;

    @Column({length: 25,nullable: false, unique: true})
    email:string;

    @Column({nullable: false})
    password:string;

    @ManyToMany(type=>RoleEntity,role=>role.users,{eager:true})
    @JoinTable( {
        name: 'user_role',
        joinColumn: { name: 'user_id'},
        inverseJoinColumn: { name: 'role_id'}
    })    
    roles:RoleEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hasPassword(){
        if(!this.password) return;
        this.password=await hash(this.password,10)
    }
}
