import Organization from '../../models/organization.model';
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
    const { user: { _id: organizationId } } = req;
    const organization = await Organization.findOne({ _id: organizationId }).exec();
    const services = await organization.servicesAsync();
    return new Success({ data: services, res }).send();
  } catch (err) {
    next(err);
  }
};
