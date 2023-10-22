import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "common/decorators/is-not-blank.decorator";

export class CreateAuthDto {
    @IsString()
    @MinLength(4,{message:"Le name dois étre plus que 4 charachters"})
    @MaxLength(20,{message:"le name ne doit pas dépasser 10 caractères"})
    name:string;

    @IsString()
    @MinLength(4,{message:"Le user-name dois étre plus que 4 charachters"})
    @MaxLength(20,{message:"le user-name ne doit pas dépasser 10 caractères"})
    userName:string;

    @IsEmail()
    email:string;

    @IsNotBlank({message:"le champs ne doit etre vide"})
    password:string;

}