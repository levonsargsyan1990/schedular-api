import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { APIError } from '../utils';
import Option from '../models/option.model';

/**
 * Checking if option exists
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated organization
 * @param {Object} req.user._id - ID of organization
 * @param {Object} req.params - Request params
 * @param {string} req.params.optionId - Id of option
 */
export const optionExists = async (req, res, next) => {
  try {
    const {
      organization,
      params: { optionId: optionStringId },
    } = req;
    const optionId = new mongoose.Types.ObjectId(optionStringId);
    const option = await Option.findOne({
      _id: optionId,
      organizationId: organization._id,
    }).exec();
    if (!option) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No option found with that ID',
      });
    }
    req.option = option;
    next();
  } catch (err) {
    next(err);
  }
};
