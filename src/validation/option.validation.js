import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
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
};
