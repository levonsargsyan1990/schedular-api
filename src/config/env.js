import path from 'path';
import { config } from 'dotenv-safe';

config({
  allowEmptyValues: true,
  example: path.join(__dirname, '../../example.env'),
});

const {
  PORT,
  JWT_SECRET,
  MONGO_URL,
  JWT_EXPIRATION_MINUTES,
} = process.env;

module.exports = {
  port: PORT,
  jwt: {
    secret: JWT_SECRET,
    expirationInterval: JWT_EXPIRATION_MINUTES,
  },
  mongo: {
    url: MONGO_URL,
  },
};
