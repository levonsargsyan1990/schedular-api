import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { APIError } from '../utils';
import Booking from '../models/booking.model';

/**
 * Checking if booking exists
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.bookingId - Id of booking
 */
export const bookingExists = async (req, res, next) => {
  try {
    const {
      organization,
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
    req.booking = booking;
    next();
  } catch (err) {
    next(err);
  }
};
