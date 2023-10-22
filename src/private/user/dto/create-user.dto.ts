import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "common/decorators/is-not-blank.decorator";

export class CreateUserDto {


    @IsString()
    @MinLength(4,{message:"Le nom dois étre plus que 4 caractères"})
    @MaxLength(10,{message:"le nom ne doit pas dépasser 10 caractères"})
    firstName:string;

    @IsString()
    @MinLength(4,{message:"Le prénom dois étre plus que 4 charachters"})
    @MaxLength(10,{message:"le prénom ne doit pas dépasser 10 caractères"})
    lastName:string;

    @IsString()
    @MinLength(4,{message:"Le user role dois étre plus que 4 charachters"})
    @MaxLength(10,{message:"le user role ne doit pas dépasser 10 caractères"})
    _rol:string;


    @IsString()
    @MinLength(4,{message:"Le user-name dois étre plus que 4 charachters"})
    @MaxLength(20,{message:"le user-name ne doit pas dépasser 10 caractères"})
    userName:string;

    @IsEmail()
    email:string;

    @IsNotBlank({message:"le champs ne doit etre vide"})
    password:string;

}