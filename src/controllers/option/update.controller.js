import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Service from '../../models/service.model';
import { Success, APIError } from '../../utils';

/**
 * Update option
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {ObjectId} [req.body.serviceId] - ID of service the option belongs to
 * @param {String} [req.body.description] - Description of option
 * @param {Number} [req.body.duration] - Duration of option
 * @param {String} [req.body.durationTimeUnit] - Time unit of the duration
 * @param {Boolean} [req.body.active] - Activity state of option
 * @param {Number} [req.body.price] - Price of option
 * @param {String} [req.body.currency] - Currency of option
 */
export const update = async (req, res, next) => {
  try {
    const {
      organization,
      option,
      body,
    } = req;

    const {
      serviceId: serviceStringId,
      description = option.description,
      duration = option.duration,
      durationTimeUnit = option.durationTimeUnit,
      active = option.active,
      price = option.price,
      currency = option.currency,
    } = body;

    // Check if service has been changed
    if (serviceStringId && serviceStringId !== option.serviceId.toString()) {
      console.log('Service changed');
      const serviceId = new mongoose.Types.ObjectId(serviceStringId);
      const service = await Service.findOne({
        _id: serviceId,
        organizationId: organization._id,
      });
      if (!service) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: `No service found with ID ${serviceStringId} in ${organization.name} organization`,
        });
      }
      option.serviceId = serviceId;
    }

    // Updating description of the option
    option.description = description;
    // Updating duration of the option
    option.duration = duration;
    // Updating durationTimeUnit of the option
    option.durationTimeUnit = durationTimeUnit;
    // Updating active of the option
    option.active = active;
    // Updating price of the option
    option.price = price;
    // Updating currency of the option
    option.currency = currency;

    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
