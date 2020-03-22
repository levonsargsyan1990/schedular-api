import { Success } from '../../utils';

/**
 * Deletes the option
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const remove = async (req, res, next) => {
  try {
    const { option } = req;
    await option.delete();
    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
