import { Success } from '../../utils';

/**
 * Finds all services of the organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const list = async (req, res, next) => {
  try {
    const { organization, query: { active } } = req;
    const services = await organization.services({ active });
    return new Success({ data: services, res }).send();
  } catch (err) {
    next(err);
  }
};
