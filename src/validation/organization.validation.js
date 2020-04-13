import Joi from '@hapi/joi';

export default {
  // POST /organizations
  create: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
};
