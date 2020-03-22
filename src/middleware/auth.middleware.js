import httpStatus from 'http-status';
import passport from 'passport';
import { APIError } from '../utils';

/**
 * Checking if option exists
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const authenticate = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: err.message,
      }));
    }
    if (!user) {
      return next(new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: info ? info.message : 'Organization not found',
      }));
    }
    req.organization = user;
    next();
  })(req, res, next);
};
