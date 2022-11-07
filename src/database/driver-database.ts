import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { Driver } from 'src/driver/driver.entity';

@Injectable()
export class DriverDatabase {
  private FILENAME = 'drivers.json';

  public async getDrivers(): Promise<Driver[]> {
    const DriversInFile = await readFile(this.FILENAME, 'utf-8');
    const drivers = JSON.parse(DriversInFile);
    return drivers;
  }

  public async saveDriver(driver: Driver) {
    let drivers = await this.getDrivers();
    if (!drivers) {
      drivers = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...drivers, driver]));
  }

  public async saveDrivers(drivers: Driver[]) {
    await writeFile(this.FILENAME, JSON.stringify(drivers));
  }
}
