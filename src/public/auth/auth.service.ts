import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'private/role/entities/role.entity';
import { AuthRepository } from './repository/auth.repository';
import { MessageDto } from 'common/generique/message.dto';
import { RoleNombre } from 'private/role/entities/role.enum';
import { UserEntity } from 'private/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(UserEntity)
    private readonly authRepository: AuthRepository,

    private readonly jwtService:JwtService,
){}


  async create(createAuthDto: CreateAuthDto) :Promise<any>{
    const {userName,email}=createAuthDto;    
    const exist= await this.authRepository.findOne({where:[
      {userName:userName},
      {email:email}]
    });
    if(exist) throw new BadRequestException(new MessageDto("le user exist déja"))
    
    const roleUser=await this.roleRepository.findOne({where:{roleName:RoleNombre.USER}})
    if(!roleUser)throw new InternalServerErrorException(new MessageDto("les rôles n'ont pas encore été créés"))
    
    const user=this.authRepository.create(createAuthDto);
    user.roles=[roleUser];
    await this.authRepository.save(user);
    return new MessageDto("user est créer avec success")
  }

  async findAll() :Promise<UserEntity[]>{
    const user=await this.authRepository.find();
    if(!user) throw new NotFoundException(new MessageDto("La liste est vide"));
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(dto: LoginDto): Promise<any> {
    const { userName } = dto;
    const user = await this.authRepository.findOne({ where: [{ userName: userName }, { email: userName }] });
    
    if (!user) {
      throw new UnauthorizedException(new MessageDto("L'utilisateur n'existe pas"));
    }
    
    const passwordOk = await compare(dto.password, user.password);
    
    if (!passwordOk) {
      throw new UnauthorizedException(new MessageDto("erroné mot de passe"));
    }
    
    const payload: PayloadInterface = {
      id: user.id,
      username: user.userName,
      email: user.email,
      roles: user.roles.map(rol => rol.roleName as RoleNombre),
    };
    
    const token = await this.jwtService.sign(payload);
    return { token };
  }
  
}
