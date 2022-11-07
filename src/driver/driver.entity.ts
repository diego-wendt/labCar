import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { IsOver18YearsOld } from 'src/utils/validators/is-over-18-years-old.validator';
import { IsValidCPF } from '../utils/validators/is-cpf-valid.validator';

export class Driver {
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsOver18YearsOld({
    message: 'The driver must be 18 years old or over. Ex: dd/MM/yyyy',
  })
  dateBirth: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'CPF must have only 11 numbers. Ex: 12345678900',
  })
  @IsValidCPF({
    message: 'Invalid CPF',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  isLocked: boolean;
}
