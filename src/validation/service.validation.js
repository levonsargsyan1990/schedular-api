import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // GET /services/service:Id
  get: {
    params: Joi.object({
      serviceId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
