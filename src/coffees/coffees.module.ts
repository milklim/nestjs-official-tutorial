import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './../events/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_LIST } from './coffees.constants';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Injectable()
class CoffeeBrandsFactory {
  create() {
    return [...COFFEE_BRANDS_LIST, 'Чорна карта'];
  }
  async createAsync() {
    const brands = await Promise.resolve([
      ...COFFEE_BRANDS_LIST,
      'Чорна карта async',
    ]);
    // console.log('CoffeeBrandsFactory > createAsync');
    return brands;
  }
}

class configService {}
class DevConfigService {}
class ProdConfigService {}
@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
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
