import { Success } from '../../utils';

/**
 * Finds the provider
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getBookings = async (req, res, next) => {
  try {
    const { provider, query: { start, end } } = req;
    const bookings = await provider.bookings({ start, end });
    return new Success({ data: bookings, res }).send();
  } catch (err) {
    next(err);
  }
};
