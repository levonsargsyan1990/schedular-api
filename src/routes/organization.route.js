import express from 'express';
import { validate } from 'express-validation';
import {
  get, list, create, update
} from '../controllers/organization';
import organizationValidation from '../validation/organization.validation';
import { isMemberOfOrganization, isOwnerOfOrganization } from '../middleware/user.middleware';
import { organizationExists } from '../middleware/organization.middleware';

const router = express.Router();

router
  .route('/')
  .get(list)
  .post(validate(organizationValidation.create), create);

router
  .route('/:organizationId')
  .get(organizationExists, isMemberOfOrganization, validate(organizationValidation.get), get)
  .patch(organizationExists, isOwnerOfOrganization, validate(organizationValidation.update), update);

export default router;
