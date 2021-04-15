import { ConfigService, ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        {
          provide: ConfigService,
          useValue: { get: (key, defaultValue) => defaultValue },
        },
        { provide: COFFEE_BRANDS, useValue: ['COFFEE_BRANDS_MOCK'] },
        { provide: 'COFFEE_BRANDS_FACTORY', useValue: ['COFFEE_BRANDS_FACTORY_MOCK'] },
        { provide: 'COFFEE_BRANDS_FACTORY_ASYNC', useValue: ['COFFEE_BRANDS_FACTORY_ASYNC_MOCK'] },
        { provide: coffeesConfig.KEY, useValue: { foo: 'mocked Foo' } },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    // service = await module.resolve(CoffeesService); // to get request scope
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
