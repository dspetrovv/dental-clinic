import { Appointment } from '@app/appointments/entity/appointment.entity';
import { Prescription } from '@app/prescriptions/entity/prescription.entity';
import { Role } from '@app/roles/entity/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointmentsAsDoctor: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointmentsAsPatient: Appointment[];

  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptionsIssued: Prescription[];

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptionsReceived: Prescription[];
}
