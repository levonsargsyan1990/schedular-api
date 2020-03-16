import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /services
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      active: Joi.bool(),
    }),
  },

  // GET /services/:serviceId
  get: {
    params: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },

  // GET /services/:serviceId/providers
  getProviders: {
    params: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
