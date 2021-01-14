import httpStatus from 'http-status';
import { APIError } from '../utils';

// TODO DRY

/**
 * Checking if user is the owner of organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.organization - Organization
 */
export const isOwnerOfOrganization = async (req, res, next) => {
  try {
    const {
      user, organization,
    } = req;
    const isOwner = await user.isOwner(organization._id);
    if (!isOwner) {
      throw new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: 'Not the owner of organization',
      });
    }
    req.organization = organization;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Checking if user is a member of organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.organization - Organization
 * @param {Object} req.user - Authenticated user
 */
export const isMemberOfOrganization = async (req, res, next) => {
  try {
    const {
      user, organization,
    } = req;
    const isMember = await user.isMember(organization._id);
    const isOwner = await user.isOwner(organization._id);
    if (!isMember && !isOwner) {
      throw new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: 'Not a member of organization',
      });
    }
    req.organization = organization;
    next();
  } catch (err) {
    next(err);
  }
};
