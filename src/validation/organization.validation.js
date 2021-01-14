import Joi from '@hapi/joi';
import { mongoIdRegex } from '../constants/regex';

export default {
  // POST /organizations
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      planId: Joi.string().required(),
    }),
  },
  // GET /organizations/:organizationId
  get: {
    params: Joi.object({
      organizationId: Joi.string().regex(mongoIdRegex).required(),
    }),
  },
  // PATCH /organizations/:organizationId
  update: {
    params: Joi.object({
      organizationId: Joi.string().regex(mongoIdRegex).required(),
    }),
    body: Joi.object({
      name: Joi.string(),
      planId: Joi.string(),
    }),
  },
};
