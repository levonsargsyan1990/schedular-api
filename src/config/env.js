import path from 'path';
import { config } from 'dotenv-safe';

config({
  allowEmptyValues: true,
  example: path.join(__dirname, '../../example.env'),
});

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGO_URL,
  JWT_EXPIRATION_MINUTES,
  SENTRY_DSN,
} = process.env;

const variables = {
  environment: NODE_ENV,
  port: PORT,
  jwt: {
    secret: JWT_SECRET,
    expirationInterval: JWT_EXPIRATION_MINUTES,
  },
  mongo: {
    url: MONGO_URL,
  },
  sentry: {
    dsn: SENTRY_DSN,
  },
};

export default variables;
