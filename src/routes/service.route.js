import express from 'express';
import passport from 'passport';
import { validate } from 'express-validation';
import { list, get, getProviders } from '../controllers/service';
import serviceValidation from '../validation/service.validation';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), list);

router
  .route('/:serviceId')
  .get(passport.authenticate('jwt', { session: false }), validate(serviceValidation.get), get);

router
  .route('/:serviceId/providers')
  .get(passport.authenticate('jwt', { session: false }), validate(serviceValidation.getProviders), getProviders);

export default router;
