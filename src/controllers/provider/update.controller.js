import httpStatus from 'http-status';
import mongoose from 'mongoose';
import merge from 'lodash/merge';
import difference from 'lodash/difference';
import Service from '../../models/service.model';
import { Success, APIError } from '../../utils';

/**
 * Update provider
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of provider
 * @param {String[]} [req.body.services=[]] - services IDs of provider
 * @param {Boolean} [req.body.active=true] - Activity state of provider
 * @param {Object} [req.body.workingHours] - Working hours of provider
 */
export const update = async (req, res, next) => {
  try {
    const {
      organization,
      provider,
      body,
    } = req;
    const {
      name = provider.name,
      services: serviceStringIds,
      workingHours = {},
      active = provider.active,
    } = body;
    if (serviceStringIds) {
      const currentServiceStringIds = provider.services.map((serviceId) => serviceId.toString());
      const newServiceStringIds = difference(serviceStringIds, currentServiceStringIds);
      if (newServiceStringIds.length) {
        const newServiceIds = newServiceStringIds
          .map((serviceStringId) => new mongoose.Types.ObjectId(serviceStringId));
        const newServices = await Service.find({ _id: { $in: newServiceIds } }).exec();
        // Check if services were found for all ids
        if (newServices.length !== newServiceIds.length) {
          // Getting IDs that didn't match any service
          const correctStringIds = newServices.map((newService) => newService._id.toString());
          const wrongStringIds = difference(newServiceStringIds, correctStringIds);
          throw new APIError({
            status: httpStatus.BAD_REQUEST,
            message: `No services found with ID ${wrongStringIds.join(', ')} in ${organization.name} organization`,
          });
        }
      }
      provider.services = serviceStringIds
        .map((serviceStringId) => new mongoose.Types.ObjectId(serviceStringId));
    }

    provider.name = name;
    provider.workingHours = merge(provider.workingHours, workingHours);
    provider.active = active;

    await provider.save();
    return new Success({ data: provider, res }).send();
  } catch (err) {
    next(err);
  }
};
