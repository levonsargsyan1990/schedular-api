import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /bookings
  create: {
    body: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
      optionId: Joi.string().regex(mongoIdRegex).required(),
      providerId: Joi.string().regex(mongoIdRegex).required(),
      status: Joi.string(),
      start: Joi.date().greater('now').required(),
      location: Joi.object({
        address: Joi.string(),
        long: Joi.number().positive().required(),
        lat: Joi.number().positive().required(),
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
        long: Joi.number().positive(),
        lat: Joi.number().positive(),
      }),
    }),
  },
};
