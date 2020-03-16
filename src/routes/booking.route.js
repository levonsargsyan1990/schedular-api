import express from 'express';
import { validate } from 'express-validation';
import { list, get, create } from '../controllers/booking';
import bookingValidation from '../validation/booking.validation';

const router = express.Router();

router
  .route('/')
  // .get(list)
  .post(validate(bookingValidation.create), create);

// router
//   .route('/:providerId')
//   .get(validate(bookingValidation.get), get);

export default router;
