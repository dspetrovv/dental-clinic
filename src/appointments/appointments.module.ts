import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entity/appointment.entity';
import { User } from '@app/users/entity/user.entity';
import { Cabinet } from '@app/cabinets/entity/cabinet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Cabinet])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
