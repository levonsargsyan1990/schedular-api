import express from 'express';
import { validate } from 'express-validation';
import {
  create,
} from '../controllers/organization';
import organizationValidation from '../validation/organization.validation';

const router = express.Router();

router
  .route('/')
  .post(validate(organizationValidation.create), create);

export default router;
