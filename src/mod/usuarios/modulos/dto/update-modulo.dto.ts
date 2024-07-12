import { PartialType } from '@nestjs/swagger';
import { CreateModuloDto } from './create-modulo.dto';
import { IsString } from 'class-validator';

export class UpdateModuloDto extends PartialType(CreateModuloDto) {
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly icono;
}
