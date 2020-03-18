import { Success } from '../../utils';

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
export const get = (req, res, next) => {
  try {
    const { booking } = req;
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
