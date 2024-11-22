import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@app/roles/entity/role.entity';
import { User } from '@app/users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '@app/roles/role.enum';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    console.log('Starting database seeding...');
    await this.seedRoles();
    await this.seedAdmin();
    console.log('Database seeding completed.');
  }

  private async seedRoles() {
    const roles: RoleEnum[] = [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.DOCTOR,
      RoleEnum.PATIENT,
      RoleEnum.RECEPTIONIST,
      RoleEnum.NURSE,
    ];

    for (const roleName of roles) {
      const roleExists = await this.roleRepository.findOne({
        where: { name: roleName },
      });
      if (!roleExists) {
        const role = this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(role);
        console.log(`Role "${roleName}" created.`);
      }
    }
  }

  private async seedAdmin() {
    const adminRole = await this.roleRepository.findOne({
      where: { name: RoleEnum.ADMIN },
    });

    if (!adminRole) {
      throw new Error('Admin role not found. Ensure roles are seeded first.');
    }

    const adminExists = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });
    if (!adminExists) {
      const password = await bcrypt.hash('0000', 10);
      const admin = this.userRepository.create({
        email: 'admin@example.com',
        password,
        firstName: 'System',
        lastName: 'Admin',
        roles: [adminRole],
      });
      await this.userRepository.save(admin);
      console.log('Successfully created admin');
    } else {
      console.log('Admin user already exists.');
    }
  }
}
