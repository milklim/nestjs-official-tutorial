import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../../src/coffees/dto/update-coffee.dto';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CommonModule } from '../../src/common/common.module';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        CommonModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.TEST_DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          synchronize: true,
          autoLoadEntities: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', async (done) => {
    const expectedCoffee = jasmine.objectContaining({
      ...coffee,
      flavors: jasmine.arrayContaining(
        coffee.flavors.map((name) => jasmine.objectContaining({ name })),
      ),
    });
    const result = await request(app.getHttpServer())
      .post('/coffees')
      .set('Authorization', process.env.API_KEY)
      .send(coffee as CreateCoffeeDto);

    expect(result.status).toBe(HttpStatus.CREATED);
    expect(result.body).toEqual(expectedCoffee);

    done();
  });

  it('Get all [GET /]', async (done) => {
    const expectedResponseBody = jasmine.arrayContaining([
      jasmine.objectContaining({
        ...coffee,
        flavors: jasmine.arrayContaining(
          coffee.flavors.map((name) => jasmine.objectContaining({ name })),
        ),
      }),
    ]);
    const result = await request(app.getHttpServer()).get('/coffees');
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toEqual(expectedResponseBody);

    done();
  });

  it('Get one [GET /:id]', async (done) => {
    const expectedCoffee = jasmine.objectContaining({
      ...coffee,
      id: 1,
      flavors: jasmine.arrayContaining(
        coffee.flavors.map((name) => jasmine.objectContaining({ name })),
      ),
    });
    const result = await request(app.getHttpServer())
      .get('/coffees/1')
      .set('Authorization', process.env.API_KEY);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toEqual(expectedCoffee);

    done();
  });

  it('Update one [PATCH /:id]', async (done) => {
    const updatingData = { description: 'Coffee description' };
    const expectedCoffee = jasmine.objectContaining({
      id: 1,
      ...coffee,
      ...updatingData,
      flavors: jasmine.arrayContaining(
        coffee.flavors.map((name) => jasmine.objectContaining({ name })),
      ),
    });
    const result = await request(app.getHttpServer())
      .patch('/coffees/1')
      .set('Authorization', process.env.API_KEY)
      .send(updatingData as UpdateCoffeeDto);
    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toEqual(expectedCoffee);

    done();
  });

  it('Delete one [DELETE /:id]', async (done) => {
    const createdCoffee = await request(app.getHttpServer())
      .post('/coffees')
      .set('Authorization', process.env.API_KEY)
      .send(coffee as CreateCoffeeDto);

      const expectedCoffee = jasmine.objectContaining({
        ...coffee,
        flavors: jasmine.arrayContaining(
          coffee.flavors.map((name) => jasmine.objectContaining({ name })),
        ),
      });

      const result = await request(app.getHttpServer())
      .delete(`/coffees/${createdCoffee.body.id}`)
      .set('Authorization', process.env.API_KEY);

    expect(result.body).toEqual(expectedCoffee);
    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
