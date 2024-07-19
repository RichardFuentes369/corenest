import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModulosDto {

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;

  @IsInt()
  // @Transform(({value}) => value.trim())
  readonly tipo;

  @IsInt()
  // @Transform(({value}) => value.trim())
  readonly userId;

  @IsInt()
  // @Transform(({value}) => value.trim())
  readonly moduloId;

  @IsOptional()
  // @Transform(({value}) => value.trim())
  readonly submoduloId: number | null;

}
