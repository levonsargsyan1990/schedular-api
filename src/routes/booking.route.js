import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, update, remove,
} from '../controllers/booking';
import { bookingExists } from '../middleware/booking.middleware';
import bookingValidation from '../validation/booking.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(bookingValidation.create), create);

router
  .route('/:bookingId')
  .all(bookingExists)
  .get(validate(bookingValidation.get), get)
  .patch(validate(bookingValidation.update), update)
  .delete(validate(bookingValidation.remove), remove);

export default router;
