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
  POSTMAN_API_KEY,
  POSTMAN_LOCAL_ENV_ID,
  POSTMAN_STAGING_ENV_ID,
  PASSWORD_SALT_ROUNDS,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
} = process.env;

const variables = {
  environment: NODE_ENV,
  port: PORT,
  auth: {
    saltRounds: parseInt(PASSWORD_SALT_ROUNDS, 10),
    jwt: {
      secret: JWT_SECRET,
      expirationInterval: JWT_EXPIRATION_MINUTES,
    },
  },
  mongo: {
    url: MONGO_URL,
  },
  sentry: {
    dsn: SENTRY_DSN,
  },
  postman: {
    apiKey: POSTMAN_API_KEY,
    localEnvId: POSTMAN_LOCAL_ENV_ID,
    stagingEnvId: POSTMAN_STAGING_ENV_ID,
  },
  stripe: {
    pubKey: STRIPE_PUBLISHABLE_KEY,
    secretKey: STRIPE_SECRET_KEY,
  }
};

export default variables;
