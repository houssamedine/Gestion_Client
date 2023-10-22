import { UserEntity } from "private/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {}