import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthadminDto } from './create-auth.dto';

export class UpdateAuthadminDto extends PartialType(CreateAuthadminDto) {}
