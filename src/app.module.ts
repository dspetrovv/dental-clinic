import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@app/roles/roles.module';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { CabinetsModule } from '@app/cabinets/cabinets.module';
import { ServicesModule } from '@app/services/services.module';
import { ScheduleModule } from '@app/schedule/schedule.module';
import { PrescriptionsModule } from '@app/prescriptions/prescriptions.module';
import { AppointmentsModule } from '@app/appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || '0000',
        database: process.env.DB_NAME || 'dental_clinic',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    CabinetsModule,
    ServicesModule,
    ScheduleModule,
    PrescriptionsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
