import Joi from 'joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /services/service:Id
  get: {
    params: {
      serviceId: Joi.string().regex(mongoIdRegex).required(),
    },
  },
};
