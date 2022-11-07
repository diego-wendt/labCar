import {
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { IsValidCPF } from 'src/utils/validators/is-cpf-valid.validator';
import { IsOver18YearsOld } from 'src/utils/validators/is-over-18-years-old.validator';

export class Passenger {
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

  @IsNotEmpty()
  @IsObject()
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}
