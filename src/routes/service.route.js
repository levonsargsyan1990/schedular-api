import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, getProviders, getOptions, update, remove,
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
  .get(validate(serviceValidation.get), get)
  .patch(validate(serviceValidation.update), update)
  .delete(validate(serviceValidation.remove), remove);

router
  .route('/:serviceId/providers')
  .all(serviceExists)
  .get(validate(serviceValidation.getProviders), getProviders);

router
  .route('/:serviceId/options')
  .all(serviceExists)
  .get(validate(serviceValidation.getOptions), getOptions);

export default router;
