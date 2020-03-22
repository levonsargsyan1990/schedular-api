import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /providers
  list: {
    query: Joi.object({
      active: Joi.bool(),
    }),
  },

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

  // PATCH /providers/:providerId
  update: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      services: Joi.array().items(Joi.string().regex(mongoIdRegex)),
      active: Joi.bool(),
      workingHours: Joi.object({
        monday: Joi.object({
          working: Joi.bool(),
          start: Joi.string(),
          end: Joi.string(),
        }),
        tuesday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        }),
        wednesday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        }),
        thursday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        }),
        friday: {
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        },
        saturday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        }),
        sunday: Joi.object({
          working: Joi.bool().required(),
          start: Joi.string(),
          end: Joi.string(),
        }),
      }),
    }),
  },

  // DELETE /providers/:providerId
  remove: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },

  // GET /providers/:providerId/booked
  getBookedDates: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
    query: Joi.object({
      start: Joi.date().greater('now').timestamp(),
      end: Joi.date().greater('now').timestamp(),
    }),
  },
};
