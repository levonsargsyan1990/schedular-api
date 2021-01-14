import express from 'express';
import { validate } from 'express-validation';
import {
  organization, user, api,
} from '../controllers/auth';
import authValidation from '../validation/auth.validation';

import {
  user as userAuthMiddleware,
} from '../middleware/auth.middleware';
import {
  isMemberOfOrganization,
} from '../middleware/user.middleware';
import {
  organizationExistsAuth
} from '../middleware/organization.middleware';

// Organization authentication routes
const organizationRouter = express.Router();
organizationRouter
  .route('/login')
  .post(
    validate(authValidation.organization.login),
    userAuthMiddleware,
    organizationExistsAuth,
    isMemberOfOrganization,
    organization.login,
  );

// API authentication routes
const apiRouter = express.Router();
apiRouter
  .route('/login')
  .post(validate(authValidation.api.login), api.login);

// User authentication routes
const userRouter = express.Router();
userRouter
  .route('/signup')
  .post(validate(authValidation.user.signup), user.signup);

userRouter
  .route('/login')
  .post(validate(authValidation.user.login), user.login);

const authRouter = express.Router();

authRouter
  .use('/api', apiRouter)
  .use('/user', userRouter)
  .use('/organization', organizationRouter);

export default authRouter;
