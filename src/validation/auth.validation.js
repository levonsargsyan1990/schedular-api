import Joi from '@hapi/joi';

export default {
  organization: {
    // POST /auth/organization/login
    login: {
      body: Joi.object({
        apiKey: Joi.string().required(),
        apiSecret: Joi.string().required(),
      }),
    },
  },
  user: {
    // POST /auth/user/signup
    signup: {
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },

    // POST /auth/user/login
    login: {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    },
  },
};
