import Organization from '../../models/organization.model';
import { Success } from '../../utils';
import { createCustomer } from '../../lib/stripe';

/**
 * Creates new organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.user._id - ID of user
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of organization
 */
export const create = async (req, res, next) => {
  try {
    const { user, body, body: { name } } = req;
    console.log(`Creating organization ${name} by user ${user._id}`);
    // Creating Stripe customer for organization
    const stripeCustomer = await createCustomer({ name });
    const organization = new Organization({ ...body, stripeCustomerId: stripeCustomer.id });
    // TODO find a more reusable way to add organizations to users
    user.organizations = [...user.organizations, { organizationId: organization._id, role: 'owner' }];
    await user.save();
    await organization.save();
    return new Success({ data: organization, res }).send();
  } catch (err) {
    next(err);
  }
};
