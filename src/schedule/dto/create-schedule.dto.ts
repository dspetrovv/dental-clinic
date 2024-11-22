import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ScheduleStatus } from '../entity/schedule.entity';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  cabinetId: number;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsEnum(ScheduleStatus)
  status?: ScheduleStatus;
}
