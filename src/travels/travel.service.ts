import { Injectable } from '@nestjs/common';
import { Travel } from './travel.entity';
import { v4 as uuidv4 } from 'uuid';
import { TravelDatabase } from 'src/database/travel-database';
import { PassengerController } from 'src/passenger/passenger.controller';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TravelService {
  constructor(
    private database: TravelDatabase,
    private passengerController: PassengerController,
    private readonly httpService: HttpService,
  ) {}

  public async createTravel(travel: Travel) {
    await this.passengerController.listPassenger(travel.cpfPassenger);
    travel.id = uuidv4();
    return await this.database.saveTravel(travel);
  }

  public async searchTravel(data) {
    const travels = await this.database.getTravels();
    const filteredTravels = travels.filter(
      (travel) =>
        travel.travelStatus == 'CREATED' &&
        travel.originAddress.city.toLowerCase() ==
          data.driverAddress.city.toLowerCase(),
    );

    const { street, number, neighborhood, city, state } = data.driverAddress;
    const driverLocal = `${street} ${number} ${neighborhood} ${city} ${state}`;

    const newList = await Promise.all(
      filteredTravels.map(async (travel) => {
        const { street, number, neighborhood, city, state } =
          travel.originAddress;

        const passengerLocal = `${street} ${number} ${neighborhood} ${city} ${state}`;

        const distance = await this.getRoutes(driverLocal, passengerLocal);
        travel.distance = distance;

        return travel;
      }),
    );
    return newList;
  }

  public async getRoutes(driverLocal, passengerLocal) {
    const GOOGLE_DIRECTIONS_API_KEY = 'ADICIONAR A CHAVE API DIRECTIONS';
    const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${driverLocal}&destination=${passengerLocal}&key=${GOOGLE_DIRECTIONS_API_KEY}`;
    const { data } = await lastValueFrom(this.httpService.get(URL));
    return data.routes[0].legs[0].distance.text;
  }
}
