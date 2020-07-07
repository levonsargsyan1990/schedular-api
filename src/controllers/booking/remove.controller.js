import { Success } from '../../utils';

/**
 * Deletes the booking
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const remove = async (req, res, next) => {
  try {
    const { booking } = req;
    await booking.delete();
    return new Success({ data: booking, res }).send();
  } catch (err) {
    next(err);
  }
};
