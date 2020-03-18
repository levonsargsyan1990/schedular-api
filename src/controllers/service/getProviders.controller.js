import { Success } from '../../utils';

/**
 * Finds all providers of service
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getProviders = async (req, res, next) => {
  try {
    const { service } = req;
    const providers = await service.providersAsync();
    return new Success({ data: providers, res }).send();
  } catch (err) {
    next(err);
  }
};
