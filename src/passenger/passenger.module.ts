import { Module } from '@nestjs/common';
import { PassengerDatabase } from 'src/database/passenger-database';
import { TravelDatabase } from 'src/database/travel-database';
import { AgeValidator } from 'src/utils/validators/calcAge';
import { IsValidCPFConstrain } from 'src/utils/validators/is-cpf-valid.validator';
import { IsOver18YearsOldConstrain } from 'src/utils/validators/is-over-18-years-old.validator';
import { validarCPF } from 'src/utils/validators/validaCPF';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';

@Module({
  controllers: [PassengerController],
  providers: [
    PassengerService,
    PassengerDatabase,
    TravelDatabase,
    IsValidCPFConstrain,
    validarCPF,
    IsOver18YearsOldConstrain,
    AgeValidator,
  ],
})
export class PassengerModule {}
