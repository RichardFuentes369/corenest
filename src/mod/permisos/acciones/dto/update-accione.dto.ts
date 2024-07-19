import { PartialType } from '@nestjs/swagger';
import { CreateAccionesDto } from './create-accione.dto';

export class UpdateAccioneDto extends PartialType(CreateAccionesDto) {}
