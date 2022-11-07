import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private service: DriverService) {}

  @Get()
  public async listDrivers(
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('name') name: string,
  ): Promise<Driver[]> {
    return await this.service.listDrivers(page, size, name);
  }

  @Get(':cpf')
  public async listDriver(@Param('cpf') cpf: string) {
    const findDriver = await this.service.listDriver(cpf);
    return await this.driverExist(findDriver, cpf);
  }

  @Post()
  public async createDriver(@Body() driver: Driver): Promise<NestResponse> {
    const findDriver = await this.service.listDriver(driver.cpf);
    await this.driverAlreadyExist(findDriver);
    await this.service.createDriver(driver);
    return this.driverCreated(driver);
  }

  @Put(':cpf')
  public async updateDriver(
    @Body() driver: Driver,
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const findDriver = await this.service.listDriver(cpf);
    await this.driverExist(findDriver, cpf);
    const findNewDriver = await this.service.listDriver(driver.cpf);

    if (findNewDriver) {
      if (findDriver.id != findNewDriver.id) {
        await this.driverAlreadyExist(findNewDriver);
      }
    }

    await this.service.updateDriver(cpf, driver);
    return await this.driverCreated(driver);
  }

  @HttpCode(204)
  @Patch(':cpf')
  public async updateDriverStatus(@Param('cpf') cpf: string) {
    const findDriver = await this.service.listDriver(cpf);
    await this.driverExist(findDriver, cpf);
    await this.service.changeStatus(cpf);
  }

  @HttpCode(204)
  @Delete(':cpf')
  public async deleteDriver(@Param('cpf') cpf: string) {
    const findDriver = await this.service.listDriver(cpf);
    await this.driverExist(findDriver, cpf);
    await this.service.deleteDriver(cpf);
  }

  public async checkTravel(driver: Driver, check: boolean) {
    if (check) {
      throw new NotFoundException({
        statusCode: 409,
        message: `Driver with cpf ${driver.cpf} can not be excluded. There is register of travels for this driver.`,
      });
    }
    return;
  }

  public async driverExist(driver: Driver, cpf) {
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Driver with cpf ${cpf} not found.`,
      });
    }
    return driver;
  }

  public async driverAlreadyExist(driver: Driver) {
    if (driver) {
      throw new ConflictException({
        statusCode: 409,
        message: `Driver with cpf ${driver.cpf} is already registered.`,
      });
    }
    return;
  }

  public async driverCreated(driver: Driver): Promise<NestResponse> {
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/drivers/${driver.cpf}` })
      .withBody(driver)
      .build();
  }

  public async isDriverBlocked(driver: Driver) {
    if (driver.isLocked) {
      throw new ForbiddenException({
        statusCode: 403,
        message: `Driver with cpf ${driver.cpf} can not search for travels because it is locked for this function.`,
      });
    }
    return;
  }
}
