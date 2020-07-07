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
    const { organization, query: { status, start, end, serviceId, providerId } } = req;
    console.log(`Fetching bookings, ${organization.name} organization (${organization._id})`);
    const bookings = await organization.bookings({status, start, end, serviceId, providerId });
    return new Success({ data: bookings, res }).send();
  } catch (err) {
    next(err);
  }
};
