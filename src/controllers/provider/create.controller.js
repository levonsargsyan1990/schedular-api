import Provider from '../../models/provider.model';
import { Success } from '../../utils';

/**
 * Creates new provider
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of provider
 * @param {String[]} [req.body.services=[]] - services IDs of provider
 * @param {Boolean} [req.body.active=true] - Activity state of provider
 * @param {Object} [req.body.workingHours] - Working hours of provider
 */
export const create = async (req, res, next) => {
  try {
    const { organization, body } = req;
    const provider = new Provider({ ...body, organizationId: organization._id });
    await provider.save();
    return new Success({ data: provider, res }).send();
  } catch (err) {
    next(err);
  }
};
