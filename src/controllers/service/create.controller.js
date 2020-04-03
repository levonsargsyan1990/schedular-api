import Service from '../../models/service.model';
import { Success } from '../../utils';

/**
 * Creates new service
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of service
 * @param {String} [req.body.description=''] - Description of service
 * @param {Boolean} [req.body.active=true] - Activity state of service
 */
export const create = async (req, res, next) => {
  try {
    const { organization, body } = req;
    console.log(`Creating service ${body.title} for organization ${organization._id}`);
    const service = new Service({ ...body, organizationId: organization._id });
    await service.save();
    return new Success({ data: service, res }).send();
  } catch (err) {
    next(err);
  }
};
