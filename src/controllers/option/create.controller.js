import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Service from '../../models/service.model';
import Option from '../../models/option.model';
import { Success, APIError } from '../../utils';

/**
 * Creates new service option
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.serviceId - ID of service
 * @param {String} [req.body.description=''] - Description of service option
 * @param {Boolean} [req.body.active=true] - Activity state of service option
 * @param {String} req.body.duration - Duration of service option
 * @param {String} req.body.price - Option price
 * @param {String} req.body.currency - Currency of option price
 */
export const create = async (req, res, next) => {
  try {
    const {
      organization, body, body: {
        serviceId: serviceStringId,
      },
    } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({
      _id: serviceId,
      organizationId: organization._id,
    }).exec();
    if (!service) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No service found with ID ${serviceStringId} in ${organization.name} organization`,
      });
    }
    const option = new Option({ ...body, organizationId: organization._id });
    await option.save();
    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
