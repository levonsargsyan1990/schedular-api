import { Success } from '../../utils';

/**
 * Finds the provider
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const get = (req, res, next) => {
  try {
    const { provider } = req;
    return new Success({ data: provider, res }).send();
  } catch (err) {
    next(err);
  }
};
