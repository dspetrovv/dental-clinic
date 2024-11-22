import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cabinet } from './entity/cabinet.entity';
import { CreateCabinetDto } from './dto/create-cabinet.dto';

@Injectable()
export class CabinetsService {
  constructor(
    @InjectRepository(Cabinet)
    private readonly cabinetRepository: Repository<Cabinet>,
  ) {}

  async create(createCabinetDto: CreateCabinetDto): Promise<Cabinet> {
    const cabinet = this.cabinetRepository.create(createCabinetDto);
    return this.cabinetRepository.save(cabinet);
  }

  async findAll(): Promise<Cabinet[]> {
    return this.cabinetRepository.find();
  }

  async findOne(id: number): Promise<Cabinet> {
    const cabinet = await this.cabinetRepository.findOne({ where: { id } });
    if (!cabinet) {
      throw new NotFoundException(`Cabinet with ID ${id} not found`);
    }
    return cabinet;
  }

  // async update(id: number, updateCabinetDto: UpdateCabinetDto): Promise<Cabinet> {
  //   const cabinet = await this.findOne(id);
  //   Object.assign(cabinet, updateCabinetDto);
  //   return this.cabinetRepository.save(cabinet);
  // }

  async remove(id: number): Promise<void> {
    const cabinet = await this.findOne(id);
    await this.cabinetRepository.remove(cabinet);
  }
}
