import Joi from '@hapi/joi';
import { cardExpiryDateRegex } from '../constants/regex';

export default {
  // POST /cards
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      cvc: Joi.string().length(3).required(),
      expiry: Joi.string().regex(cardExpiryDateRegex).required(),
      number: Joi.string().creditCard().required(),
      addressLine1: Joi.string(),
      addressLine2: Joi.string().required(),
      city: Joi.string(),
      state: Joi.string(),
      zip: Joi.string(),
      country: Joi.string(),
    }),
  },
};
