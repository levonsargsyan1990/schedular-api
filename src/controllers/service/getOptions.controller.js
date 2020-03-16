import mongoose from 'mongoose';
import Service from '../../models/service.model';
import { Success } from '../../utils';

/**
 * Finds all options of service by serviceId
 *
 * @param {Object} req - Request object
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 * @param {Object} res - Response object
 */
export const getOptions = async (req, res, next) => {
  try {
    const { params: { serviceId: serviceStringId } } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({ _id: serviceId }).exec();
    const options = await service.optionsAsync();
    return new Success({ data: options, res }).send();
  } catch (err) {
    next(err);
  }
};
