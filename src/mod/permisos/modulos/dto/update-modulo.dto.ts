import { PartialType } from '@nestjs/swagger';
import { CreateModulosDto } from './create-modulo.dto';

export class UpdateModuloDto extends PartialType(CreateModulosDto) {}
