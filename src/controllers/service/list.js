import Service from '../../models/service';

export const list = async (req, res, next) => {
  const { user: organization } = req;
  const services = await Service.find({ organizationId: organization._id }).exec();
  console.log('List services');
  console.log(res.send(services));
}