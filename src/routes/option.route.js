import express from 'express';
import { validate } from 'express-validation';
import {
  list, get, create, update, remove,
} from '../controllers/option';
import { optionExists } from '../middleware/option.middleware';
import optionValidation from '../validation/option.validation';

const router = express.Router();

router
  .route('/')
  .get(validate(optionValidation.list), list)
  .post(validate(optionValidation.create), create);

router
  .route('/:optionId')
  .all(optionExists)
  .get(validate(optionValidation.get), get)
  .patch(validate(optionValidation.update), update)
  .delete(validate(optionValidation.remove), remove);

export default router;
