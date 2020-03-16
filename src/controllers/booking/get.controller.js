import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Booking from '../../models/booking.model';
import { Success, APIError } from '../../utils';

/**
 * Finds the booking by bookingId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.bookingId - Id of booking
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const get = async (req, res, next) => {
  try {
    const { user: organization, params: { bookingId: bookingStringId } } = req;
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
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
