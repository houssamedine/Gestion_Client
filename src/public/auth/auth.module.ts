import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'private/user/entities/user.entity';
import { RoleEntity } from 'private/role/entities/role.entity';
import { AuthRepository } from './repository/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_KEY } from 'common/config/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        UserEntity,
        RoleEntity,
        AuthRepository
      ]),

    PassportModule.register({
      defaultStrategy:'jwt',
    }),
    
    JwtModule.registerAsync({
        imports:[ConfigModule],
        useFactory:async (configService:ConfigService)=>({
          secret:configService.get(JWT_KEY),
          signOptions:{
            expiresIn:7200
          }
        }),
        inject:[ConfigService],
      }),

  ],
  providers: [AuthService,ConfigService,JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule,JwtStrategy]
 
})
export class AuthModule {}
