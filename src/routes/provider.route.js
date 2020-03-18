import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, getBookedDates,
} from '../controllers/provider';
import { providerExists } from '../middlewares/provider.middleware';
import providerValidation from '../validation/provider.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(providerValidation.create), create);

router
  .route('/:providerId')
  .all(providerExists)
  .get(validate(providerValidation.get), get);

router
  .route('/:providerId/booked')
  .all(providerExists)
  .get(validate(providerValidation.getBookedDates), getBookedDates);

export default router;
