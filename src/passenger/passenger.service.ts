import { Injectable } from '@nestjs/common';
import { PassengerDatabase } from 'src/database/passenger-database';
import { TravelDatabase } from 'src/database/travel-database';
import { v4 as uuidv4 } from 'uuid';
import { Passenger } from './passenger.entity';

@Injectable()
export class PassengerService {
  constructor(
    private database: PassengerDatabase,
    private travelDatabase: TravelDatabase,
  ) {}

  public async listPassengers(page, size, name): Promise<Passenger[]> {
    const passengers = await this.database.getPassengers();

    const filterName = name || '';
    const pageNumber = page || 0;
    const sizeNumber = size || 10;

    const filteredPassengers = passengers.filter((passenger) =>
      passenger.name.toLowerCase().includes(filterName.toLowerCase()),
    );

    let startIndex = parseInt(pageNumber) * parseInt(sizeNumber);
    let endIndex = startIndex + parseInt(sizeNumber);
    if (startIndex < 0) {
      startIndex = 0;
      endIndex = 10;
    }

    if (startIndex >= filteredPassengers.length) {
      return [];
    }

    const newList = filteredPassengers.slice(startIndex, endIndex);
    return newList;
  }

  public async listPassenger(cpf: string) {
    const passengers = await this.database.getPassengers();

    const passenger = passengers.find((passenger) => passenger.cpf == cpf);
    return passenger;
  }

  public async createPassenger(passenger) {
    passenger.id = uuidv4();
    await this.database.savePassenger(passenger);
    return passenger;
  }

  public async updatePassenger(cpf: string, passenger: Passenger) {
    const passengers = await this.database.getPassengers();
    passengers.map((item) => {
      if (item.cpf == cpf) {
        item.name = passenger.name;
        item.dateBirth = passenger.dateBirth;
        item.cpf = passenger.cpf;
        item.address = passenger.address;
        return item;
      }
      return item;
    });
    this.database.savePassengers(passengers);
    return passenger;
  }

  public async deletePassenger(cpf) {
    const passengers = await this.database.getPassengers();
    const newList = passengers.filter((passenger) => passenger.cpf != cpf);
    this.database.savePassengers(newList);
  }

  public async checkTravelRegistered(passenger: Passenger) {
    const travels = await this.travelDatabase.getTravels();
    const listTravels = travels.find(
      (travels) => travels.cpfPassenger == passenger.cpf,
    );
    if (listTravels) {
      return true;
    } else {
      return false;
    }
  }
}
