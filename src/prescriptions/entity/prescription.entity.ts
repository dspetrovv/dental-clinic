import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/users/entity/user.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.prescriptionsIssued, { nullable: false })
  doctor: User;

  @ManyToOne(() => User, (user) => user.prescriptionsReceived, { nullable: false })
  patient: User;

  @Column()
  medicineName: string;

  @Column()
  dosage: string;

  @Column({ nullable: true })
  comments?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
