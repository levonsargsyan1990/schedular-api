import { Success } from '../../utils';

/**
 * Finds the organization
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const get = (req, res, next) => {
  try {
    const { organization } = req;
    return new Success({ data: organization, res }).send();
  } catch (err) {
    next(err);
  }
};
