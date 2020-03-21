import { Success } from '../../utils';

/**
 * Finds the provider
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getBookedDates = async (req, res, next) => {
  try {
    const { provider, query: { start, end } } = req;
    const bookedDates = await provider.bookedDates({ start, end });
    return new Success({ data: bookedDates, res }).send();
  } catch (err) {
    next(err);
  }
};
