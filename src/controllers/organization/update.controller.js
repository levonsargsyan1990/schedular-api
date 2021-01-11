import { Success } from '../../utils';

/**
 * Finds the organization
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} req.organization - Current organization
 * @param {Object} req.body - Body of request
 * @param {String} req.body.name - Name of organization
 * @param {String} req.body.planId - Subscription plan of organization
 */
export const update = (req, res, next) => {
  try {
    const { organization } = req;
    console.log(`Updating organization, ${organization.name} organization ${organization._id}`);

    if (!organization) {
      throw new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No org found with ID ${serviceStringId} in ${organization.name} organization`,
      });
    }
    return new Success({ data: organization, res }).send();
  } catch (err) {
    next(err);
  }
};
