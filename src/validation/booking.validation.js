import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /bookings
  list: {
    query: Joi.object({
      status: Joi.string().valid('all', 'created', 'canceled', 'completed', 'in-progress'),
      start: Joi.date().timestamp(),
      end: Joi.date().timestamp(),
      serviceId: Joi.string().regex(mongoIdRegex),
      providerId: Joi.string().regex(mongoIdRegex),
    }),
  },

  // POST /bookings
  create: {
    body: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
      optionId: Joi.string().regex(mongoIdRegex).required(),
      providerId: Joi.string().regex(mongoIdRegex).required(),
      start: Joi.date().greater('now').required(),
      location: Joi.object({
        address: Joi.string(),
        long: Joi.number().required(),
        lat: Joi.number().required(),
      }),
    }),
  },

  // GET /bookings/:bookingId
  get: {
    params: Joi.object({
      bookingId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },

  // PATCH /bookings/:bookingId
  update: {
    params: Joi.object({
      bookingId: Joi.string().regex(mongoIdRegex).required(),
    }),
    body: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex),
      optionId: Joi.string().regex(mongoIdRegex),
      providerId: Joi.string().regex(mongoIdRegex),
      start: Joi.date().greater('now'),
      status: Joi.string(),
      location: Joi.object({
        address: Joi.string(),
        long: Joi.number(),
        lat: Joi.number(),
      }),
    }),
  },

  // DELETE /bookings/:bookingId
  remove: {
    params: Joi.object({
      bookingId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },

};
