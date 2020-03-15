import Service from '../../models/service.model';

export const get = async (req, res) => {
  const { user: organization } = req;
  const services = await Service.findOne({ organizationId: organization._id }).exec();
  res.send(services);
};
