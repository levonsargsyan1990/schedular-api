import { Success } from '../../utils';

/**
 * Finds the option
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const get = (req, res, next) => {
  try {
    const { option } = req;
    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
