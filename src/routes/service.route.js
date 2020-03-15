import express from 'express';
import passport from 'passport';
import { validate } from 'express-validation';
import { list, get } from '../controllers/service';
import serviceValidation from '../validation/service.validation';

const router = express.Router();

router
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), list);

router
  .route('/:serviceId')
  .get(passport.authenticate('jwt', { session: false }), validate(serviceValidation.get), get);

export default router;
