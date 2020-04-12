import passport from 'passport';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Success, APIError } from '../../../utils';

import env from '../../../config/env';

/**
 * Logging in as Organization
 *
 * @param {*} req
 * @param {Object} req.body - Body of request
 * @param {String} req.body.email - Email of user
 * @param {String} req.body.password - Password of user
 * @param {*} next
 */
export const login = (req, res, next) => {
  console.log('Organization login attempt');
  passport.authenticate('organizationLogin', async (err, organization, info) => {
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
        message: info.message,
      });
    } else {
      const token = jwt.sign({ organizationId: organization._id }, env.auth.jwt.secret);
      console.log(`Logged in to ${organization.name} organization (${organization._id})`);
      return new Success({ data: { token }, res }).send();
    }
  })(req, res, next);
};
