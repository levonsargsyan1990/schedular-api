import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /providers
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      services: Joi.array().items(Joi.string().regex(mongoIdRegex)),
      active: Joi.bool(),
    }),
  },

  // GET /providers/:providerId
  get: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
