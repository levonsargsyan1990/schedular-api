import { Success } from '../../utils';

/**
 * Finds user documents of authenticated user
 *
 * @param {Object} req.user - Authenticated user
 * @param {Object} req.user._id - ID of user
 * @param {Object} res - Response object
 */
export const getMe = (req, res, next) => {
  try {
    const { user } = req;
    console.log(`Fetching authenticated user data from user ${user._id}`);
    return new Success({ data: user, res }).send();
  } catch (err) {
    next(err);
  }
};
