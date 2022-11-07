import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DriverDatabase } from 'src/database/driver-database';
import { PassengerDatabase } from 'src/database/passenger-database';
import { TravelDatabase } from 'src/database/travel-database';
import { DriverController } from 'src/driver/driver.controller';
import { DriverService } from 'src/driver/driver.service';
import { PassengerController } from 'src/passenger/passenger.controller';
import { PassengerService } from 'src/passenger/passenger.service';
import { IsValidCPFConstrain } from 'src/utils/validators/is-cpf-valid.validator';
import { validarCPF } from 'src/utils/validators/validaCPF';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';

@Module({
  imports: [HttpModule],
  controllers: [TravelController],
  providers: [
    TravelService,
    TravelDatabase,
    IsValidCPFConstrain,
    validarCPF,
    PassengerController,
    PassengerDatabase,
    PassengerService,
    DriverService,
    DriverDatabase,
    DriverController,
  ],
})
export class TravelModule {}
