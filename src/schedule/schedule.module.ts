import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entity/schedule.entity';
import { Cabinet } from '@app/cabinets/entity/cabinet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Cabinet])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
