import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validarCPF } from 'src/utils/validators/validaCPF';

@Injectable()
@ValidatorConstraint()
export class IsValidCPFConstrain implements ValidatorConstraintInterface {
  constructor(private service: validarCPF) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!this.service.validaCPF(value);
  }
}

export function IsValidCPF(ValidationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      validator: IsValidCPFConstrain,
    });
  };
}
