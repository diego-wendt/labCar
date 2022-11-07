import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Passenger } from 'src/passenger/passenger.entity';

@Injectable()
export class PassengerDatabase {
  private FILENAME = 'passengers.json';

  public async getPassengers(): Promise<Passenger[]> {
    const PassengerInFile = await readFile(this.FILENAME, 'utf-8');
    const passengers = JSON.parse(PassengerInFile);
    return passengers;
  }

  public async savePassenger(passenger: Passenger) {
    let passengers = await this.getPassengers();
    if (!passengers) {
      passengers = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...passengers, passenger]));
  }

  public async savePassengers(passenger: Passenger[]) {
    await writeFile(this.FILENAME, JSON.stringify(passenger));
  }
}
