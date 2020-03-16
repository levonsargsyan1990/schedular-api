import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Service from '../../models/service.model';
import { Success, APIError } from '../../utils';

/**
 * Finds the service by serviceId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const get = async (req, res, next) => {
  try {
    const { user: organization, params: { serviceId: serviceStringId } } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({
      _id: serviceId,
      organizationId: organization._id,
    }).exec();
    if (!service) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No service found with that ID',
      });
    }
    return new Success({ data: service, res }).send();
  } catch (err) {
    next(err);
  }
};
