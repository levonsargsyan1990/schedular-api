import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { APIError } from '../utils';
import Provider from '../models/provider.model';

/**
 * Checking if provider exists
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.providerId - Id of provider
 */
export const providerExists = async (req, res, next) => {
  try {
    const {
      user: organization,
      params: { providerId: providerStringId },
    } = req;
    const providerId = new mongoose.Types.ObjectId(providerStringId);
    const provider = await Provider.findOne({
      _id: providerId,
      organizationId: organization._id,
    }).exec();
    if (!provider) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No provider found with that ID',
      });
    }
    req.provider = provider;
    next();
  } catch (err) {
    next(err);
  }
};
