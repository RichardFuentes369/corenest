import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthuserDto } from './create-auth.dto';

export class UpdateAuthuserDto extends PartialType(CreateAuthuserDto) {}
