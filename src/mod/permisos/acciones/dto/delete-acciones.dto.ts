import { IsInt, IsNumber, IsString } from "class-validator";

export class DeleteAccionesDto  {

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

}
