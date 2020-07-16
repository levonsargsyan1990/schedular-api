import express from 'express';
import { validate } from 'express-validation';
import {
  list, create,
} from '../controllers/card';
import cardValidation from '../validation/card.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(create);

export default router;
