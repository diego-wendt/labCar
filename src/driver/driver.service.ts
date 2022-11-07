import { DriverDatabase } from 'src/database/driver-database';
import { Injectable } from '@nestjs/common';
import { Driver } from './driver.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DriverService {
  constructor(private database: DriverDatabase) {}

  public async listDrivers(page, size, name): Promise<Driver[]> {
    const drivers = await this.database.getDrivers();

    const filterName = name || '';
    const pageNumber = page || 0;
    const sizeNumber = size || 10;

    const filteredDrivers = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(filterName.toLowerCase()),
    );

    let startIndex = parseInt(pageNumber) * parseInt(sizeNumber);
    let endIndex = startIndex + parseInt(sizeNumber);
    if (startIndex < 0) {
      startIndex = 0;
      endIndex = 10;
    }

    if (startIndex >= filteredDrivers.length) {
      return [];
    }

    const newList = filteredDrivers.slice(startIndex, endIndex);
    return newList;
  }

  public async listDriver(cpf: string): Promise<Driver> {
    const drivers = await this.database.getDrivers();
    return drivers.find((driver) => driver.cpf == cpf);
  }

  public async createDriver(driver: Driver) {
    driver.id = uuidv4();
    driver.isLocked = false;
    await this.database.saveDriver(driver);
    return driver;
  }

  public async updateDriver(cpf: string, driver: Driver) {
    const drivers = await this.database.getDrivers();
    drivers.map((item) => {
      if (item.cpf == cpf) {
        item.name = driver.name;
        item.dateBirth = driver.dateBirth;
        item.cpf = driver.cpf;
        item.model = driver.model;
        item.licensePlate = driver.licensePlate;
        return item;
      }
      return item;
    });
    this.database.saveDrivers(drivers);
    return driver;
  }

  public async changeStatus(cpf) {
    const drivers = await this.database.getDrivers();
    drivers.map((item) => {
      if (item.cpf == cpf) {
        item.isLocked = !item.isLocked;
        return item;
      }
      return item;
    });
    this.database.saveDrivers(drivers);
  }

  public async deleteDriver(cpf) {
    const drivers = await this.database.getDrivers();
    const newList = drivers.filter((driver) => driver.cpf != cpf);
    this.database.saveDrivers(newList);
  }
}
