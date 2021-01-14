import Organization from '../../models/organization.model';
import { Success } from '../../utils';

/**
 * Creates new organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.user._id - ID of user
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of organization
 * @param {String} req.body.planId - Subscription plan of organization
 */
export const create = async (req, res, next) => {
  try {
    const { user, body, body: { name, planId } } = req;
    console.log(`Creating organization ${name} by user ${user._id}`);
    const organization = new Organization(body);
    // TODO find a more reusable way to add organizations to users
    user.organizations = [...user.organizations, { organizationId: organization._id, role: 'owner' }];
    await user.save();
    await organization.save();
    return new Success({ data: organization, res }).send();
  } catch (err) {
    next(err);
  }
};
