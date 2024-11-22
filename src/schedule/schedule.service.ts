import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entity/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
// import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Cabinet } from '@app/cabinets/entity/cabinet.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Cabinet)
    private readonly cabinetRepository: Repository<Cabinet>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const cabinet = await this.cabinetRepository.findOne({
      where: { id: createScheduleDto.cabinetId },
    });

    if (!cabinet) {
      throw new NotFoundException(`Cabinet with ID ${createScheduleDto.cabinetId} not found`);
    }

    const schedule = this.scheduleRepository.create({
      ...createScheduleDto,
      cabinet,
    });

    return this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({ relations: ['cabinet'] });
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['cabinet'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  // async update(
  //   id: number,
  //   updateScheduleDto: UpdateScheduleDto,
  // ): Promise<Schedule> {
  //   const schedule = await this.findOne(id);

  //   if (updateScheduleDto.cabinetId) {
  //     const cabinet = await this.cabinetRepository.findOne({
  //       where: { id: updateScheduleDto.cabinetId },
  //     });
  //     if (!cabinet) {
  //       throw new NotFoundException(`Cabinet with ID ${updateScheduleDto.cabinetId} not found`);
  //     }
  //     schedule.cabinet = cabinet;
  //   }

  //   Object.assign(schedule, updateScheduleDto);
  //   return this.scheduleRepository.save(schedule);
  // }

  async remove(id: number): Promise<void> {
    const schedule = await this.findOne(id);
    await this.scheduleRepository.remove(schedule);
  }
}
