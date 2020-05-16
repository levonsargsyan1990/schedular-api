import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /organizations
  create: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
  // GET /organizations/:organizationId
  get: {
    params: Joi.object({
      organizationId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
};
