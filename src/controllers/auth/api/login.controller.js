import passport from 'passport';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

import { Success, APIError } from '../../../utils';
import env from '../../../config/env';

/**
 * Logging in as Organization from API
 *
 * @param {*} req
 * @param {Object} req.body - Body of request
 * @param {*} next
 */
export const login = (req, res, next) => {
  console.log('API login attempt');
  passport.authenticate('apiLogin', async (err, organization, info) => {
    if (err) {
      console.log('Failed to login:', err);
      const apiError = new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
      next(apiError);
    }
    if (info) {
      console.log('Failed to login', info.message);
      const apiError = new APIError({
        status: httpStatus.BAD_REQUEST,
        message: info.message,
      });
      next(apiError);
    } else {
      const token = jwt.sign({ organizationId: organization._id }, env.auth.jwt.secret);
      console.log(`Logged in to ${organization.name} organization (${organization._id})`);
      return new Success({ data: { token }, res }).send();
    }
  })(req, res, next);
};
