import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_LIST } from './coffees.constants';

@Injectable()
class CoffeeBrandsFactory {
  create() {
    return [...COFFEE_BRANDS_LIST, 'Чорна карта'];
  }
  async createAsync() {
    const brands = await Promise.resolve([...COFFEE_BRANDS_LIST, 'Чорна карта async']);
    // console.log('CoffeeBrandsFactory > createAsync');
    return brands;
  }
}

class configService {}
class DevConfigService {}
class ProdConfigService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    { provide: COFFEE_BRANDS, useValue: COFFEE_BRANDS_LIST },
    {
      provide: 'COFFEE_BRANDS_FACTORY',
      useFactory: (coffeeBrandFactory: CoffeeBrandsFactory) =>
        coffeeBrandFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
    {
      provide: 'COFFEE_BRANDS_FACTORY_ASYNC',
      useFactory: async (coffeeBrandFactory: CoffeeBrandsFactory) =>
        coffeeBrandFactory.createAsync(),
      inject: [CoffeeBrandsFactory],
    },
    {
      provide: configService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevConfigService
          : ProdConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
