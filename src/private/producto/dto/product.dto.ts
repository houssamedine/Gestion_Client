import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "common/decorators/is-not-blank.decorator";


export class ProductDto {

    @IsNotBlank({message: 'el nombre no puede estar vacío'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(10, {message: 'el precio debe de ser al menos de 10 €'})
    precio?: number;
}