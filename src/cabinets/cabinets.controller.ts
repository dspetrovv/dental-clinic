import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { Roles } from '@app/decorators/roles.decorator';
import { RoleEnum } from '@app/roles/role.enum';

@Controller('cabinets')
export class CabinetsController {
  constructor(private readonly cabinetsService: CabinetsService) {}

  @Roles([RoleEnum.ADMIN, RoleEnum.MODERATOR])
  @Post()
  create(@Body() createCabinetDto: CreateCabinetDto) {
    return this.cabinetsService.create(createCabinetDto);
  }

  @Get()
  findAll() {
    return this.cabinetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cabinetsService.findOne(id);
  }

  // @Roles([RoleEnum.ADMIN, RoleEnum.MODERATOR])
  // @Patch(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateCabinetDto: UpdateCabinetDto,
  // ) {
  //   return this.cabinetsService.update(id, updateCabinetDto);
  // }

  // @Roles([RoleEnum.ADMIN, RoleEnum.MODERATOR])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cabinetsService.remove(id);
  }
}
