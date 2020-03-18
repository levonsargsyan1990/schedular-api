import { Success } from '../../utils';

/**
 * Finds the provider
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getBookedDates = async (req, res, next) => {
  try {
    const { provider } = req;
    const bookedDates = await provider.bookedDates();
    return new Success({ data: bookedDates, res }).send();
  } catch (err) {
    next(err);
  }
};
