import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { CabinetStatus } from '../entity/cabinet.entity';

export class CreateCabinetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(CabinetStatus)
  status?: CabinetStatus;
}
