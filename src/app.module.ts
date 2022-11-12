import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { DriverDatabase } from './database/driver-database';
import { PassengerDatabase } from './database/passenger-database';
import { TravelDatabase } from './database/travel-database';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { TravelModule } from './travels/travel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassengerModule,
    DriverModule,
    TravelModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [
    DriverDatabase,
    PassengerDatabase,
    TravelDatabase,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
