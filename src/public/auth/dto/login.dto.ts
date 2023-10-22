import { MaxLength, MinLength } from "class-validator";
import { IsNotBlank } from "common/decorators/is-not-blank.decorator";

export class LoginDto {

    @MinLength(4,{message:"Le user-name dois étre plus que 4 charachters"})
    @MaxLength(20,{message:"le user-name ne doit pas dépasser 10 caractères"})
    userName:string;

    @IsNotBlank({message:"le champs ne doit etre vide"})
    password:string;
}