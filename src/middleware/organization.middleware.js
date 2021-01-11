import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { APIError } from '../utils';
import Organization from '../models/organization.model';

/**
 * Checking if organization exists
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.organizationId - Id of organization
 */
export const organizationExists = async (req, res, next) => {
  try {
    const {
      params: { organizationId: organizationStringId },
    } = req;
    const organizationId = new mongoose.Types.ObjectId(organizationStringId);
    const organization = await Organization.findOne({
      _id: organizationId,
    }).exec();
    if (!organization) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No organization found with that ID',
      });
    }
    console.log(`Organization found with id ${organization._id}`);
    req.organization = organization;
    next();
  } catch (err) {
    next(err);
  }
};

