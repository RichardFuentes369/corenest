import { PartialType } from '@nestjs/swagger';
import { CreateAsignacionDto } from './create-asignacion.dto';

export class UpdateAsignacionDto extends PartialType(CreateAsignacionDto) {}
