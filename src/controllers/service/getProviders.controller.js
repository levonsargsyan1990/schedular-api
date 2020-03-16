import mongoose from 'mongoose';
import Provider from '../../models/provider.model';
import { Success } from '../../utils';

/**
 * Finds all providers of service by serviceId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const getProviders = async (req, res, next) => {
  try {
    const { user: organization, params: { serviceId: serviceStringId } } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const providers = await Provider.find({
      services: serviceId,
      organizationId: organization._id,
    }).exec();
    return new Success({ data: providers, res }).send();
  } catch (err) {
    next(err);
  }
};
