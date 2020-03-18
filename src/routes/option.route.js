import express from 'express';
import { validate } from 'express-validation';
import { create } from '../controllers/option';
import optionValidation from '../validation/option.validation';

const router = express.Router();

router
  .route('/')
  .post(validate(optionValidation.create), create);

export default router;
