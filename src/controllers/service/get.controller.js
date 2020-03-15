import Service from '../../models/service.model';

export const get = async (req, res, next) => {
  const { user: organization } = req;
  console.log('==================');
  console.log('PARMS', req.params);
  const services = await Service.findOne({ organizationId: organization._id }).exec();
  console.log('List services');
  console.log(res.send(services));
}