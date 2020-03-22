import httpStatus from 'http-status';
import { Success, APIError } from '../../utils';

/**
 * Deletes the provider
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const remove = async (req, res, next) => {
  try {
    const { provider } = req;
    const bookings = await provider.bookings();
    if (bookings.length) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `Provider ${provider._id} still has ${bookings.length} upcoming bookings`,
      });
    }
    await provider.delete();
    return new Success({ data: provider, res }).send();
  } catch (err) {
    next(err);
  }
};
