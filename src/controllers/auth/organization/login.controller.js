import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Success, APIError } from '../../../utils';

import env from '../../../config/env';

/**
 * Logging in as Organization with user token
 *
 * @param {*} req
 * @param {Object} req.body - Body of request
 * @param {Object} req.body.user - Authenticated user
 * @param {Object} req.body.organization - Organization to authenticate to
 * @param {*} next
 */
export const login = (req, res) => {
  try {
    const { user, organization } = req;
    console.log('Organization login attempt');
    const token = jwt.sign({ organizationId: organization._id }, env.auth.jwt.secret);
    console.log(`Logged in to ${organization.name} organization (${organization._id}) using user ${user._id}`);
    return new Success({ data: { token }, res }).send();
  } catch (err) {
    throw new APIError({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};
