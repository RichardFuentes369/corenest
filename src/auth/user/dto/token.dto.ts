import { IsString } from "class-validator";

export class TokenDto {
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly token;
}