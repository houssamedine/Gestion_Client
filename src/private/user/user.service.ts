import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "common/generique/message.dto";
import { UserEntity } from "./entities/user.entity";
import { RoleEntity } from "private/role/entities/role.entity";
import { RoleNombre } from "private/role/entities/role.enum";
import { RoleRepository } from "./../role/repository/role.repository";
import { UserRepository } from "./repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: RoleRepository,
    // private readonly roleRepository: Repository<RoleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository
  ) {}

  async create(createUserDto: CreateUserDto, isAdmin: boolean): Promise<any> {
    const { userName, email, _rol } = createUserDto;
    const exist = await this.userRepository.findOne({
      where: [{ userName: userName }, { email: email }],
    });
    if (exist) {
      throw new BadRequestException(new MessageDto("Le user existe déjà"));
    }

    const roleUser = await this.roleRepository.findOne({
      where: { roleName: RoleNombre.USER },
    });
    const roleAdmin = await this.roleRepository.findOne({
      where: { roleName: RoleNombre.ADMIN },
    });

    if (!roleUser || !roleAdmin) {
      throw new InternalServerErrorException(
        new MessageDto("Les rôles n'ont pas encore été créés")
      );
    }

    const user = this.userRepository.create(createUserDto);

    if (_rol === "user") {
      user.roles = [roleUser];
    } else if (isAdmin && _rol === "admin") {
      user.roles = [roleAdmin, roleUser];
    }

    await this.userRepository.save(user);
    return new MessageDto("Le user est créé avec succès");
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    if (!users.length)
      throw new NotFoundException(new MessageDto("Aucun user dans la liste"));
    return users;
  }
}
