import { Success } from '../../utils';

/**
 * Finds the option
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const get = (req, res, next) => {
  try {
    const { option, organization } = req;
    console.log(`
    Fetching option ${option._id},
    ${organization.name} organization ${organization._id}
  `);
    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
