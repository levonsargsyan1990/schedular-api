import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Booking from '../../models/booking.model';
import Service from '../../models/service.model';
import Option from '../../models/option.model';
import Provider from '../../models/provider.model';
import { Success, APIError } from '../../utils';

/**
 * Creates new booking
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.serviceId - ID of service
 * @param {String} req.body.optionId - ID of service option
 * @param {String} req.body.providerId - ID of provider
 * @param {Date} req.body.start - Start date
 * @param {Date} req.body.end - End date
 * @param {Object} req.body.location - Location of booking
 * @param {String} req.body.location.address - Text address of booking
 * @param {Number} req.body.location.long - Longitude location of booking
 * @param {Number} req.body.location.lat - Latitude location of booking
 */
export const create = async (req, res, next) => {
  try {
    const {
      user: organization, body, body: {
        serviceId: serviceStringId,
        optionId: optionStringId,
        providerId: providerStringId,
        start,
        end,
      },
    } = req;

    // Check if service exists for organization
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({
      _id: serviceId,
      active: true,
      organizationId: organization._id,
    }).exec();
    if (!service) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No service found with ID ${serviceStringId} in ${organization.name} organization`,
      });
    }

    // Check if service option exists for organization
    const optionId = new mongoose.Types.ObjectId(optionStringId);
    const option = await Option.findOne({
      _id: optionId,
      active: true,
      serviceId: service._id,
      organizationId: organization._id,
    }).exec();
    if (!option) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No option found with ID ${optionStringId} in ${organization.name} organization`,
      });
    }

    // Check if provider exists for organization and providers that service
    const providerId = new mongoose.Types.ObjectId(providerStringId);
    const provider = await Provider.findOne({
      _id: providerId,
      active: true,
      services: serviceId,
      organizationId: organization._id,
    }).exec();
    if (!provider) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No provider found with ID ${providerStringId} for ${service.name} service`,
      });
    }

    // Check if provider is available for specified dates
    const isProviderAvailable = await provider.isAvailable({
      start: new Date(start),
      end: new Date(end),
    });
    if (!isProviderAvailable) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `Provider with ID ${provider._id.toString()} is not available for dates ${start} to ${end}`,
      });
    }

    const booking = new Booking({
      ...body,
      name: service.name,
      duration: option.duration,
      price: option.price,
      currency: option.currency,
      organizationId: organization._id,
    });
    await booking.save();
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
