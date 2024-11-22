import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entity/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from '@app/users/entity/user.entity';
import { Cabinet } from '@app/cabinets/entity/cabinet.entity';
import { RoleEnum } from '@app/roles/role.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cabinet)
    private readonly cabinetRepository: Repository<Cabinet>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.userRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
      relations: ['roles'],
    });
  
    if (!doctor || !doctor.roles.some((role) => role.name === RoleEnum.DOCTOR)) {
      throw new NotFoundException(
        `User with ID ${createAppointmentDto.doctorId} is not a doctor.`,
      );
    }
  
    const patient = await this.userRepository.findOne({
      where: { id: createAppointmentDto.patientId },
      relations: ['roles'],
    });
  
    if (!patient || !patient.roles.some((role) => role.name === RoleEnum.PATIENT)) {
      throw new NotFoundException(
        `User with ID ${createAppointmentDto.patientId} is not a patient.`,
      );
    }
  
    const cabinet = await this.cabinetRepository.findOne({
      where: { id: createAppointmentDto.cabinetId },
    });
  
    if (!cabinet) {
      throw new NotFoundException(`Cabinet with ID ${createAppointmentDto.cabinetId} not found.`);
    }
  
    const appointment = this.appointmentRepository.create({
      doctor,
      patient,
      cabinet,
      ...createAppointmentDto,
    });
  
    return this.appointmentRepository.save(appointment);
  }
  

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['doctor', 'patient', 'cabinet'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient', 'cabinet'],
    });
  
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  
    return appointment;
  }

  // async update(
  //   id: number,
  //   updateAppointmentDto: UpdateAppointmentDto,
  // ): Promise<Appointment> {
  //   const appointment = await this.findOne(id);

  //   if (updateAppointmentDto.doctorId) {
  //     const doctor = await this.userRepository.findOne({
  //       where: { id: updateAppointmentDto.doctorId, role: 'DOCTOR' },
  //     });
  //     if (!doctor) {
  //       throw new NotFoundException(
  //         `Doctor with ID ${updateAppointmentDto.doctorId} not found`,
  //       );
  //     }
  //     appointment.doctor = doctor;
  //   }

  //   if (updateAppointmentDto.patientId) {
  //     const patient = await this.userRepository.findOne({
  //       where: { id: updateAppointmentDto.patientId, role: 'PATIENT' },
  //     });
  //     if (!patient) {
  //       throw new NotFoundException(
  //         `Patient with ID ${updateAppointmentDto.patientId} not found`,
  //       );
  //     }
  //     appointment.patient = patient;
  //   }

  //   if (updateAppointmentDto.cabinetId) {
  //     const cabinet = await this.cabinetRepository.findOne({
  //       where: { id: updateAppointmentDto.cabinetId },
  //     });
  //     if (!cabinet) {
  //       throw new NotFoundException(
  //         `Cabinet with ID ${updateAppointmentDto.cabinetId} not found`,
  //       );
  //     }
  //     appointment.cabinet = cabinet;
  //   }

  //   Object.assign(appointment, updateAppointmentDto);
  //   return this.appointmentRepository.save(appointment);
  // }

  async remove(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }
}
