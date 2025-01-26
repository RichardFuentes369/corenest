import { IsNumber, IsString } from "class-validator";
export class CreateAuthadminDto {

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly username;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly pass;
    
}

    
