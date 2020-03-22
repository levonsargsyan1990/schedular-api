import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { APIError } from '../utils';
import Service from '../models/service.model';

/**
 * Checking if service exists
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.serviceId - Id of service
 */
export const serviceExists = async (req, res, next) => {
  try {
    const {
      organization,
      params: { serviceId: serviceStringId },
    } = req;
    const serviceId = new mongoose.Types.ObjectId(serviceStringId);
    const service = await Service.findOne({
      _id: serviceId,
      organizationId: organization._id,
    }).exec();
    if (!service) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No service found with that ID',
      });
    }
    req.service = service;
    next();
  } catch (err) {
    next(err);
  }
};
