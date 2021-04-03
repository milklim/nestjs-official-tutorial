import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5533,
      password: 'password',
    }),
    CoffeesModule,
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
