// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateAdminDto {

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly firstName;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly lastName;
    
    @IsEmail()
    // @Transform(({value}) => value.trim())
    readonly email;

    @IsString()
    // @Transform(({value}) => value.trim())
    readonly password;

    @IsBoolean()
    // @Transform(({value}) => value.trim())
    readonly isActive;
    
}
