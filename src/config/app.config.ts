import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const apiKey = process.env.API_KEY || null;
  if (!apiKey) console.warn('!:: specify "API_KEY" in .env');

  return {
    environment: process.env.NODE_ENV || 'development',
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
    },
    apiKey,
  };
});
