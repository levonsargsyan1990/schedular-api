import httpStatus from 'http-status';
import mongoose from 'mongoose';
import find from 'lodash/find';
import { APIError } from '../utils';
import Organization from '../models/organization.model';

// TODO DRY

/**
 * Checking if user is the owner of organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.body - Request body
 * @param {Object} req.body.organizationId - ID of organization
 */
export const isOwnerOfOrganization = async (req, res, next) => {
  try {
    const {
      user,
      body: { organizationId: organizationStringId },
    } = req;
    const organizationId = new mongoose.Types.ObjectId(organizationStringId);
    const organization = await Organization.findOne({ _id: organizationId }).exec();
    if (!organization) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No organization found with that ID',
      });
    }
    const foundOrganization = find(user.organizations, { organizationId });
    if (!foundOrganization) {
      throw new APIError({
        status: httpStatus.UNAUTHORIZED,
        message: 'Not a member of organization',
      });
    }
    if (foundOrganization.role !== 'owner') {
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
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.body - Request body
 * @param {Object} req.body.organizationId - ID of organization
 */
export const isMemberOfOrganization = async (req, res, next) => {
  try {
    const {
      user,
      body: { organizationId: organizationStringId },
    } = req;
    const organizationId = new mongoose.Types.ObjectId(organizationStringId);
    const organization = await Organization.findOne({ _id: organizationId }).exec();
    if (!organization) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No organization found with that ID',
      });
    }
    const foundOrganization = find(user.organizations, { organizationId });
    if (!foundOrganization) {
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
