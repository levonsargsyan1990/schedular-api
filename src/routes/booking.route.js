import express from 'express';
import { validate } from 'express-validation';
import { list, get, create, patch } from '../controllers/booking';
import bookingValidation from '../validation/booking.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(bookingValidation.create), create);

router
  .route('/:bookingId')
  .get(validate(bookingValidation.get), get)
  .patch(validate(bookingValidation.update), update);

export default router;
