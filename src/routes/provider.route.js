import express from 'express';
import passport from 'passport';
import { validate } from 'express-validation';
import { list, get } from '../controllers/provider';
import providerValidation from '../validation/provider.validation';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), list);

router
  .route('/:providerId')
  .get(passport.authenticate('jwt', { session: false }), validate(providerValidation.get), get);

export default router;
