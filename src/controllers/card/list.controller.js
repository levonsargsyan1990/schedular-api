import { Success } from '../../utils';

/**
 * Finds all billing cards of the user
 *
 * @param {Object} req - Request object
 * @param {Object} req.user - Authenticated user
 * @param {Object} res - Response object
 */
export const list = async (req, res, next) => {
  try {
    const { user } = req;
    console.log(`Fetching users billing cards, ${user._id})`);
    const cards = await user.cards();
    return new Success({ data: cards, res }).send();
  } catch (err) {
    next(err);
  }
};
