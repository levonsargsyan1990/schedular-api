import { Success } from '../../utils';

/**
 * Finds all providers of the organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} res - Response object
 */
export const list = async (req, res, next) => {
  try {
    const { user: organization } = req;
    const bookings = await organization.bookings();
    return new Success({ data: bookings, res }).send();
  } catch (err) {
    next(err);
  }
};
