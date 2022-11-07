import { Controller, Post, Body } from '@nestjs/common';
import { DriverController } from 'src/driver/driver.controller';
import { Travel } from './travel.entity';
import { TravelService } from './travel.service';

@Controller('travels')
export class TravelController {
  constructor(
    private service: TravelService,
    private driverController: DriverController,
  ) {}

  @Post()
  public async createTravel(@Body() travel: Travel) {
    return await this.service.createTravel(travel);
  }

  @Post('/driver')
  public async searchTravel(@Body() data) {
    const driver = await this.driverController.listDriver(data.cpfDriver);
    await this.driverController.isDriverBlocked(driver);
    return await this.service.searchTravel(data);
  }
}
