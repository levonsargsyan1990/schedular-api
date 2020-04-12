import Joi from '@hapi/joi';

export default {
  // POST /organization
  create: {
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },
};
