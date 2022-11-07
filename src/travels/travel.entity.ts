import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { IsValidCPF } from 'src/utils/validators/is-cpf-valid.validator';
import { TravelStatus } from './travel.status.enum';

export class Travel {
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, {
    message: 'CPF must have only 11 numbers. Ex: 12345678900',
  })
  @IsValidCPF({
    message: 'Invalid CPF',
  })
  cpfPassenger: string;

  cpfDriver: string;

  distance: string;

  @IsNotEmpty()
  @IsObject()
  originAddress: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };

  @IsNotEmpty()
  @IsObject()
  destinationAddress: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };

  @IsEnum(TravelStatus)
  travelStatus: TravelStatus;
}
