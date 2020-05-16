import express from 'express';
import { validate } from 'express-validation';
import {
  get, list, create,
} from '../controllers/organization';
import organizationValidation from '../validation/organization.validation';
import {
  user as userAuthMiddleware,
  organization as organizationAuthMiddleware,
} from '../middleware/auth.middleware';

const router = express.Router();

router
  .route('/')
  .get(userAuthMiddleware, list)
  .post(userAuthMiddleware, validate(organizationValidation.create), create);

router
  .route('/:organizationId')
  .get(organizationAuthMiddleware, validate(organizationValidation.get), get);

export default router;
