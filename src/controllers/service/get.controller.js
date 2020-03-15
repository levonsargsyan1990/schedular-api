import Service from '../../models/service.model';

/**
 * Finds the service by serviceId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 * @param {Object} res - Response object
 */
export const get = async (req, res) => {
  const { user: organization } = req;
  const services = await Service.findOne({ organizationId: organization._id }).exec();
  res.send(services);
};
