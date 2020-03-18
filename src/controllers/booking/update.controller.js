import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Booking from '../../models/booking.model';
import Service from '../../models/service.model';
import Provider from '../../models/provider.model';
import { Success, APIError } from '../../utils';

/**
 * Update booking
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.bookingId - Id of booking
 * @param {Object} req.body - Body of request
 * @param {String} req.body.serviceId - ID of service
 * @param {String} req.body.providerId - ID of provider
 * @param {Date} req.body.start - Start date
 * @param {Date} req.body.end - End date
 * @param {Object} req.body.location - Location of booking
 * @param {String} req.body.location.address - Text address of booking
 * @param {Number} req.body.location.long - Longitude location of booking
 * @param {Number} req.body.location.lat - Latitude location of booking
 */
export const update = async (req, res, next) => {
  try {
    const {
      user: organization,
      body,
      params: { bookingId: bookingStringId },
    } = req;
    const bookingId = new mongoose.Types.ObjectId(bookingStringId);
    const booking = await Booking.findOne({
      _id: bookingId,
      organizationId: organization._id,
    }).exec();
    if (!booking) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No booking found with that ID',
      });
    }
    // const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    // const service = await Service.findOne({
    //   _id: serviceId,
    //   organizationId: organization._id,
    // }).exec();
    // if (!service) {
    //   throw new APIError({
    //     status: httpStatus.BAD_REQUEST,
    //     message: `No service found with ID ${serviceStringId} in ${organization.name} organization`,
    //   });
    // }
    // const providerId = new mongoose.Types.ObjectId(providerStringId);
    // const provider = await Provider.findOne({
    //   _id: providerId,
    //   services: serviceId,
    //   organizationId: organization._id,
    // }).exec();
    // if (!provider) {
    //   throw new APIError({
    //     status: httpStatus.BAD_REQUEST,
    //     message: `No provider found with ID ${providerStringId} for ${service.name} service`,
    //   });
    // }

    const booking = new Booking({ ...body, organizationId: organization._id });
    await booking.save();
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
