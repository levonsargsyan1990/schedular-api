import express from 'express';
import { validate } from 'express-validation';
import { list, get, create } from '../controllers/provider';
import providerValidation from '../validation/provider.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(providerValidation.create), create);

router
  .route('/:providerId')
  .get(validate(providerValidation.get), get);

export default router;
