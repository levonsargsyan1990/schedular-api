import mongoose from 'mongoose';
import Service from '../../models/service.model';
import { Success } from '../../utils';

/**
 * Finds all providers of service by serviceId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 * @param {Object} res - Response object
 */
export const getProviders = async (req, res, next) => {
  try {
    const { params: { serviceId: serviceStringId } } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({ _id: serviceId }).exec();
    const providers = await service.providersAsync();
    return new Success({ data: providers, res }).send();
  } catch (err) {
    next(err);
  }
};
