import { IsNumber, IsString } from "class-validator";
export class CreateAuthuserDto {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly username;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly pass;
    
}
