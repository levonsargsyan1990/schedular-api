import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, update, getBookedDates,
} from '../controllers/provider';
import { providerExists } from '../middlewares/provider.middleware';
import providerValidation from '../validation/provider.validation';

const router = express.Router();

router
  .route('/')
  .get(validate(providerValidation.list), list)
  .post(validate(providerValidation.create), create);

router
  .route('/:providerId')
  .all(providerExists)
  .get(validate(providerValidation.get), get)
  .patch(validate(providerValidation.update), update);

router
  .route('/:providerId/booked')
  .all(providerExists)
  .get(validate(providerValidation.getBookedDates), getBookedDates);

export default router;
