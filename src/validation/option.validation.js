import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /options
  list: {
    query: Joi.object({
      active: Joi.bool(),
    }),
  },

  // POST /option
  create: {
    body: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
      description: Joi.string(),
      duration: Joi.number().min(0).required(),
      durationTimeUnit: Joi.string().valid('s', 'm', 'h').default('m'),
      active: Joi.bool(),
      price: Joi.number().positive().required(),
      currency: Joi.string(),
    }),
  },

  // GET /options/:optionId
  get: {
    params: Joi.object({
      optionId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },

  // PATCH /options/:optionId
  update: {
    params: Joi.object({
      optionId: Joi.string().regex(mongoIdRegex).required(),
    }),
    body: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex),
      description: Joi.string(),
      duration: Joi.number().min(0),
      durationTimeUnit: Joi.string().valid('s', 'm', 'h').default('m'),
      active: Joi.bool(),
      price: Joi.number().positive(),
      currency: Joi.string(),
    }),
  },
};
