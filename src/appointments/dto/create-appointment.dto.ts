import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  IsEnum,
} from 'class-validator';
import { AppointmentStatus } from '../entity/appointment.entity';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

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

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
