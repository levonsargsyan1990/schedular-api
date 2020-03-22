import { Success } from '../../utils';

/**
 * Deletes the service
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const remove = async (req, res, next) => {
  try {
    const { service } = req;
    await service.removeOptions();
    await service.removeFromProviders();
    service.delete();
    return new Success({ data: service, res }).send();
  } catch (err) {
    next(err);
  }
};
