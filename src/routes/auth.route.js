import express from 'express';
import { validate } from 'express-validation';
import {
  organization, user,
} from '../controllers/auth';
import authValidation from '../validation/auth.validation';

// Organization authentication routes
const organizationRouter = express.Router();
organizationRouter
  .route('/login')
  .post(validate(authValidation.organization.login), organization.login);

// User authentication routes
const userRouter = express.Router();
userRouter
  .route('/signup')
  .post(validate(authValidation.user.signup), user.signup);

export const authRouter = express.Router();

authRouter
  .use('/user', userRouter)
  .use('/organization', organizationRouter);
