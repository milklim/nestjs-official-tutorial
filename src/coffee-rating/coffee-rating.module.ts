import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { options as dbConnectionConfig } from 'src/database/database.config';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    DatabaseModule.register(dbConnectionConfig),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
