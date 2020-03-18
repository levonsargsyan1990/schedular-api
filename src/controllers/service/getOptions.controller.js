import { Success } from '../../utils';

/**
 * Finds all options of service
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const getOptions = async (req, res, next) => {
  try {
    const { service } = req;
    const options = await service.optionsAsync();
    return new Success({ data: options, res }).send();
  } catch (err) {
    next(err);
  }
};
