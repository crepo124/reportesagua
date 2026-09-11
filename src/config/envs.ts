import * as env from 'env-var';
import 'dotenv/config';

export const envs = {
  DB_TYPE: env.get('DB_TYPE').required().asString(),
  DB_HOST: env.get('DB_HOST').required().asString(),
  DB_PORT: env.get('DB_PORT').required().asPortNumber(),
  DB_USER: env.get('DB_USER').required().asString(),
  DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
  DB_NAME: env.get('DB_NAME').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_USER: env.get('MAILER_USER').required().asString(),
  CREW_EMAIL: env.get('CREW_EMAIL').required().asString(),
  MAILER_PASSWORD: env.get('MAILER_PASSWORD').required().asString(),
};