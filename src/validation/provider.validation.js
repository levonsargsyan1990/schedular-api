import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /providers
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      services: Joi.array().items(Joi.string().regex(mongoIdRegex)),
      active: Joi.bool(),
      workingHours: Joi.object({
        monday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
        tuesday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
        wednesday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
        thursday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
        friday: {
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        },
        saturday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
        sunday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.when('working', { is: true, then: Joi.string().required() }),
          end: Joi.when('working', { is: true, then: Joi.string().required() }),
        }),
      }),
    }),
  },

  // GET /providers/:providerId
  get: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
