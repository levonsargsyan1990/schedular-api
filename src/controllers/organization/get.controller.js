import { Success } from '../../utils';

/**
 * Finds the organization
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} req.organization - Organization
 * @param {Object} req.params.organizationId - ID of organization
 */
export const get = (req, res, next) => {
  try {
    const { organization } = req;
    return new Success({ data: organization, res }).send();
  } catch (err) {
    next(err);
  }
};
