import passport from 'passport';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Success, APIError } from '../../utils';

import env from '../../config/env';

/**
 * Logging in
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = (req, res, next) => {
  console.log('Login attempt');
  passport.authenticate('login', async (err, organization, info) => {
    if (err) {
      console.log('Failed to login:', err);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
    if (info) {
      console.log('Failed to login', info.message);
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: err.message,
      });
    } else {
      const token = jwt.sign({ organizationId: organization._id }, env.auth.jwt.secret);
      console.log(`Logged in to ${organization.name} organization (${organization._id})`);
      return new Success({ data: { token }, res }).send();
    }
  })(req, res, next);
};
