import Service from '../../models/service.model';


/**
 * Finds all services of the organization
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} res - Response object
 */
export const list = async (req, res, next) => {
  const { user: organization } = req;
  const services = await Service.find({ organizationId: organization._id }).exec();
  res.send(services);
};
