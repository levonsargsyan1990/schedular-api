import express from 'express';
import { validate } from 'express-validation';
import { get, create } from '../controllers/option';
import { optionExists } from '../middlewares/option.middleware';
import optionValidation from '../validation/option.validation';

const router = express.Router();

router
  .route('/')
  .post(validate(optionValidation.create), create);


router
  .route('/:optionId')
  .all(optionExists)
  .get(validate(optionValidation.get), get);

export default router;
