import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, getProviders, getOptions,
} from '../controllers/service';
import { serviceExists } from '../middlewares/service.middleware';
import serviceValidation from '../validation/service.validation';

const router = express.Router();

router
  .route('/')
  .get(validate(serviceValidation.list), list)
  .post(validate(serviceValidation.create), create);

router
  .route('/:serviceId')
  .all(serviceExists)
  .get(validate(serviceValidation.get), get);

router
  .route('/:serviceId/providers')
  .all(serviceExists)
  .get(validate(serviceValidation.getProviders), getProviders);

router
  .route('/:serviceId/options')
  .all(serviceExists)
  .get(validate(serviceValidation.getOptions), getOptions);

export default router;
