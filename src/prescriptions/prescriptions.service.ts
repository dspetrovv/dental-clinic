import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './entity/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { User } from '@app/users/entity/user.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    const doctor = await this.userRepository.findOne({
      where: { id: createPrescriptionDto.doctorId },
      relations: ['roles'],
    });

    if (!doctor || !doctor.roles.some((role) => role.name === 'DOCTOR')) {
      throw new NotFoundException(`Doctor with ID ${createPrescriptionDto.doctorId} not found.`);
    }

    const patient = await this.userRepository.findOne({
      where: { id: createPrescriptionDto.patientId },
      relations: ['roles'],
    });

    if (!patient || !patient.roles.some((role) => role.name === 'PATIENT')) {
      throw new NotFoundException(`Patient with ID ${createPrescriptionDto.patientId} not found.`);
    }

    const prescription = this.prescriptionRepository.create({
      doctor,
      patient,
      ...createPrescriptionDto,
    });

    return this.prescriptionRepository.save(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return this.prescriptionRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found.`);
    }

    return prescription;
  }

  // async update(
  //   id: number,
  //   updatePrescriptionDto: UpdatePrescriptionDto,
  // ): Promise<Prescription> {
  //   const prescription = await this.findOne(id);
  //   Object.assign(prescription, updatePrescriptionDto);
  //   return this.prescriptionRepository.save(prescription);
  // }

  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await this.prescriptionRepository.remove(prescription);
  }
}
