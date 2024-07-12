// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateModuloDto {

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly nombre;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly icono;
    
}
