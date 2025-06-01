import { PartialType } from '@nestjs/swagger';
import { CreateLmsmasterDto } from './create-lmsmaster.dto';

export class UpdateLmsmasterDto extends PartialType(CreateLmsmasterDto) {}
