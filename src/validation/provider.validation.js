import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /providers/:providerId
  get: {
    params: Joi.object({
      providerId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
