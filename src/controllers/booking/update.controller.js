import httpStatus from 'http-status';
import moment from 'moment';
import mongoose from 'mongoose';
import Service from '../../models/service.model';
import Option from '../../models/option.model';
import Provider from '../../models/provider.model';
import { Success, APIError } from '../../utils';

/**
 * Update booking
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {string} req.booking - Current booking
 * @param {Object} req.body - Body of request
 * @param {String} req.body.serviceId - ID of service
 * @param {String} req.body.providerId - ID of provider
 * @param {Date} req.body.start - Start date
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
      booking,
    } = req;

    const {
      location = booking.location,
      serviceId: serviceStringId,
      optionId: optionStringId,
      providerId: providerStringId,
      start,
    } = body;

    // Updating location of the booking
    booking.location = location;

    // Check if service has been changed
    if (serviceStringId && serviceStringId !== booking.serviceId.toString()) {
      console.log('Service changed');
      const serviceId = new mongoose.Types.ObjectId(serviceStringId);
      const service = await Service.findOne({
        _id: serviceId,
        active: true,
        organizationId: organization._id,
      });
      if (!service) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: `No service found with ID ${serviceStringId} in ${organization.name} organization`,
        });
      }
      booking.serviceId = serviceId;
      booking.name = service.name;
    }

    // Check if option has been changed
    if (optionStringId && optionStringId !== booking.optionId.toString()) {
      console.log('Option changed');
      const optionId = new mongoose.Types.ObjectId(optionStringId);
      const option = await Option.findOne({
        _id: optionId,
        active: true,
        serviceId: booking.serviceId,
        organizationId: organization._id,
      });
      if (!option) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: `No option found with ID ${optionStringId} in ${organization.name} organization`,
        });
      }

      booking.optionId = optionId;
      booking.price = option.price;
      booking.currency = option.currency;
      booking.duration = option.duration;
      booking.durationTimeUnit = option.durationTimeUnit;
    }

    // Check if date has been changed
    let dateHasChanged = false;
    if (start && new Date(start).getTime() !== booking.start.getTime()) {
      booking.start = new Date(start);
      dateHasChanged = true;
    }

    const end = moment(booking.start)
      .add(booking.duration, booking.durationTimeUnit)
      .utc()
      .format();

    if (!moment(booking.start).isSame(end, 'day')) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'Multi day bookings are not supported',
      });
    }

    if (end && new Date(end).getTime() !== booking.end.getTime()) {
      booking.end = new Date(end);
      dateHasChanged = true;
    }

    // Check if date has been changed
    let providerHasChanged = false;
    if (providerStringId && providerStringId !== booking.providerId.toString()) {
      booking.providerId = new mongoose.Types.ObjectId(providerStringId);
      providerHasChanged = true;
    }

    // Check provider availability if providerId or booking dates have been changed.
    if (providerHasChanged || dateHasChanged) {
      console.log('Provider / Date has been changed');
      const provider = await Provider.findOne({
        _id: booking.providerId,
        active: true,
        services: booking.serviceId,
        organizationId: organization._id,
      }).exec();
      if (!provider) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: `No provider found with ID ${booking.providerId.toString()} in ${organization.name} organization`,
        });
      }
      const isProviderAvailable = await provider.isAvailable({
        start: booking.start,
        end: booking.end,
      }, { excludedBookings: [booking._id] });
      if (!isProviderAvailable) {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: `Provider with ID ${booking.providerId.toString()} is not available for dates ${start} to ${end}`,
        });
      }
    }
    await booking.save();
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
