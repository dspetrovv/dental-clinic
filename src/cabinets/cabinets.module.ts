import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CabinetsService } from './cabinets.service';
import { CabinetsController } from './cabinets.controller';
import { Cabinet } from './entity/cabinet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cabinet])],
  controllers: [CabinetsController],
  providers: [CabinetsService],
  exports: [CabinetsService],
})
export class CabinetsModule {}
