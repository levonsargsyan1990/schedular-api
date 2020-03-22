import Option from '../../models/option.model';
import { Success } from '../../utils';

/**
 * Deletes the option
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
export const remove = async (req, res, next) => {
  try {
    const { option, user: organization } = req;
    await Option.deleteOne({ _id: option._id, organizationId: organization._id });
    return new Success({ data: option, res }).send();
  } catch (err) {
    next(err);
  }
};
