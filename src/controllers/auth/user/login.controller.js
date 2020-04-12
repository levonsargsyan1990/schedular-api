import passport from 'passport';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Success, APIError } from '../../../utils';

import env from '../../../config/env';

/**
 * Logging in as User
 *
 * @param {Object} req - Request object
 * @param {Object} req.body - Body of request
 * @param {String} req.body.email - Email of user
 * @param {String} req.body.password - Password of user
 * @param {*} next
 */
export const login = (req, res, next) => {
  console.log('User login attempt');
  passport.authenticate('userLogin', async (err, user, info) => {
    if (err || info) {
      console.log('Failed to login:', err ? err.message : info.message);
      const apiError = new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'incorrect credentials',
      });
      return next(apiError);
    }
    const token = jwt.sign({ userId: user._id }, env.auth.jwt.secret);
    console.log(`Logged in as ${user.firstName} ${user.lastName}`);
    return new Success({ data: { token }, res }).send();
  })(req, res, next);
};
