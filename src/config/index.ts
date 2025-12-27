import dotenv from 'dotenv';

dotenv.config();

const CORS_WHITELIST = [`https://example.com`];
const _1H_IN_MILLISECOUNDS = 1000 * 60 * 60;
const _7DAYS_IN_MILLISECONDs = 1000 * 60 * 60 * 24 * 7;

const config = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  CORS_WHITELIST,
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN!,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,
  WINDOW_MS: _1H_IN_MILLISECOUNDS,
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI!,
  WHITELISITED_EMAILS: process.env.WHITELISITED_EMAILS?.split(',')!,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFERESH_SECRET: process.env.JWT_REFERESH_SECRET!,
  COOKIE_MAX_AGE:_7DAYS_IN_MILLISECONDs
};

export default config;
