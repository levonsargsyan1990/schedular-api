import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, getProviders,
} from '../controllers/service';
import serviceValidation from '../validation/service.validation';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(serviceValidation.create), create);

router
  .route('/:serviceId')
  .get(validate(serviceValidation.get), get);

router
  .route('/:serviceId/providers')
  .get(validate(serviceValidation.getProviders), getProviders);

export default router;
