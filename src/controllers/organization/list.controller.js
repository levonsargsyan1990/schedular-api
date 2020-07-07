import Organization from '../../models/organization.model';
import { Success } from '../../utils';

/**
 * Finds all organizations of user
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.user._id - ID of user
 */
export const list = async (req, res, next) => {
  try {
    const { user } = req;
    console.log(`Fetching organization, ${user.firstName} ${user.lastName} user (${user._id})`);
    const organizationIds = user.organizations.map(({ organizationId }) => organizationId);
    const organizations = await Organization.find({ _id: { $in: organizationIds } }).exec();
    return new Success({ data: organizations, res }).send();
  } catch (err) {
    next(err);
  }
};
