import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from 'private/role/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,RoleEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
