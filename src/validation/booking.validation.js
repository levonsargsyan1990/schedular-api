import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /bookings
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      serviceId: Joi.string().regex(mongoIdRegex).required(),
      providerId: Joi.string().regex(mongoIdRegex).required(),
      start: Joi.date().required(),
      status: Joi.string(),
      end: Joi.date().required(),
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
      name: Joi.string(),
      serviceId: Joi.string().regex(mongoIdRegex),
      providerId: Joi.string().regex(mongoIdRegex),
      start: Joi.date(),
      status: Joi.string(),
      end: Joi.date(),
      location: Joi.object({
        address: Joi.string(),
        long: Joi.number().positive(),
        lat: Joi.number().positive(),
      }),
    }),
  },
};
