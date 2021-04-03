import { ConnectionOptions } from 'typeorm';

export const options: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5533,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  synchronize: true,
};
