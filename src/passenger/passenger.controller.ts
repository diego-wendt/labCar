import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  Injectable,
  Query,
} from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';

@Injectable()
@Controller('passengers')
export class PassengerController {
  constructor(private service: PassengerService) {}

  @Get()
  public async listPassengers(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('name') name: string,
  ): Promise<Passenger[]> {
    const passengers = await this.service.listPassengers(page, size, name);
    return passengers;
  }

  @Get(':cpf')
  public async listPassenger(@Param('cpf') cpf: string): Promise<Passenger> {
    const passenger = await this.service.listPassenger(cpf);
    await this.passengerExist(passenger, cpf);
    return passenger;
  }

  @Post()
  public async createPassenger(
    @Body() passenger: Passenger,
  ): Promise<NestResponse> {
    const findPassenger = await this.service.listPassenger(passenger.cpf);
    await this.passengerAlreadyExist(findPassenger);
    await this.service.createPassenger(passenger);
    return this.passengerCreated(passenger);
  }

  @Put(':cpf')
  public async updatePassenger(
    @Body() passenger: Passenger,
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const findPassenger = await this.service.listPassenger(cpf);
    await this.passengerExist(findPassenger, cpf);
    const findNewPassenger = await this.service.listPassenger(passenger.cpf);

    if (findNewPassenger) {
      if (findPassenger.id != findNewPassenger.id) {
        await this.passengerAlreadyExist(findNewPassenger);
      }
    }

    await this.service.updatePassenger(cpf, passenger);
    return await this.passengerCreated(passenger);
  }

  @HttpCode(204)
  @Delete(':cpf')
  public async deletePassenger(@Param('cpf') cpf: string) {
    const findPassenger = await this.service.listPassenger(cpf);
    await this.passengerExist(findPassenger, cpf);
    const checkTravel = await this.service.checkTravelRegistered(findPassenger);
    await this.checkTravel(findPassenger, checkTravel);
    await this.service.deletePassenger(cpf);
  }

  public async checkTravel(passenger: Passenger, check: boolean) {
    if (check) {
      throw new ConflictException({
        statusCode: 409,
        message: `Passenger with cpf ${passenger.cpf} can not be excluded. There is register of travels for this passenger.`,
      });
    }
    return;
  }

  public async passengerExist(passenger: Passenger, cpf) {
    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Passenger with cpf ${cpf} not found.`,
      });
    }
    return passenger;
  }

  public async passengerAlreadyExist(passenger: Passenger) {
    if (passenger) {
      throw new ConflictException({
        statusCode: 409,
        message: `Passenger with cpf ${passenger.cpf} is already registered.`,
      });
    }
    return;
  }

  public async passengerCreated(passenger: Passenger): Promise<NestResponse> {
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/passengers/${passenger.cpf}` })
      .withBody(passenger)
      .build();
  }
}
