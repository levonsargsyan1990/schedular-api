import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Provider from '../../models/provider.model';
import { Success, APIError } from '../../utils';

/**
 * Finds the provider by providerId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.providerId - Id of provider
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const get = async (req, res, next) => {
  try {
    const { user: organization, params: { providerId: providerStringId } } = req;
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
    return new Success({ data: provider, res }).send();
  } catch (err) {
    next(err);
  }
};
