import { Module } from '@nestjs/common';
import { DriverDatabase } from 'src/database/driver-database';
import { validarCPF } from 'src/utils/validators/validaCPF';
import { AgeValidator } from 'src/utils/validators/calcAge';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { IsValidCPFConstrain } from '../utils/validators/is-cpf-valid.validator';
import { IsOver18YearsOldConstrain } from 'src/utils/validators/is-over-18-years-old.validator';

@Module({
  controllers: [DriverController],
  providers: [
    DriverService,
    DriverDatabase,
    IsValidCPFConstrain,
    validarCPF,
    IsOver18YearsOldConstrain,
    AgeValidator,
  ],
})
export class DriverModule {}
