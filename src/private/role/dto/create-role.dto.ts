import { IsEnum } from "class-validator";
import { RoleNombre } from "../entities/role.enum";

export class CreateRoleDto {

    @IsEnum(RoleNombre,{message:"le rôle ne peut être qu'utilisateur ou administrateur"})
    roleName:string;

}