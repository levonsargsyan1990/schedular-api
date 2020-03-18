import { Success } from '../../utils';

/**
 * Finds the service
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const get = (req, res, next) => {
  try {
    const { service } = req;
    return new Success({ data: service, res }).send();
  } catch (err) {
    next(err);
  }
};
