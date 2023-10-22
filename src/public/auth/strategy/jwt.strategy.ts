import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "../repository/auth.repository";
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from "../interfaces/payload.interface";
import { UserEntity } from "private/user/entities/user.entity";
import { JWT_KEY } from "common/config/constants";
import { MessageDto } from "common/generique/message.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
      @InjectRepository(UserEntity)
      private readonly authRepository:AuthRepository,
      private readonly configService:ConfigService,
      private readonly jwtService:JwtService

    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:configService.get(JWT_KEY),
        });
    }

    async validate(payload:PayloadInterface) {
        const {username,email}=payload;
        const user=await this.authRepository.findOne({where:[{userName:username},{email:email}]});
        if(!user)return new UnauthorizedException(new MessageDto('Identification erronées'));
        return payload;
    }
}