import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AgeValidator } from 'src/utils/validators/calcAge';

@Injectable()
@ValidatorConstraint()
export class IsOver18YearsOldConstrain implements ValidatorConstraintInterface {
  constructor(private service: AgeValidator) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!this.service.calcAge(value);
  }
}

export function IsOver18YearsOld(ValidationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: ValidationOptions,
      validator: IsOver18YearsOldConstrain,
    });
  };
}
