import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { MessageDto } from 'common/generique/message.dto';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
constructor(
  @InjectRepository(RoleEntity)
  private readonly roleRepository: RoleRepository,
  ){}

  async create(createRoleDto: CreateRoleDto):Promise<any> {
    const exist=await this.roleRepository.findOne({where:{roleName:createRoleDto.roleName}});
    if(exist) throw new BadRequestException(new MessageDto("le rôle exist déja"))
    await this.roleRepository.save(createRoleDto as RoleEntity);
  return new MessageDto("le rôle est créer avec success")
  }

  async findAll():Promise<RoleEntity[]> {
    const roles=await this.roleRepository.find();
    if(!roles.length)throw new NotFoundException(new MessageDto("Aucun rôle dans la liste"))
    return roles;
  }

}
