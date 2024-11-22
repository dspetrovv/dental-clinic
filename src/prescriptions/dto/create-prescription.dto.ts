import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsNotEmpty()
  @IsString()
  medicineName: string;

  @IsNotEmpty()
  @IsString()
  dosage: string;

  @IsOptional()
  @IsString()
  comments?: string;
}
