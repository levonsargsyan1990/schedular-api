import { Success } from '../../../utils';

/**
 * Stripe update price event
 *
 * @param {Object} req - Request object
 */
export const updatePrice = async (req, res, next) => {
  try {
    const { user, body, body: { data } } = req;
    console.log('Stripe update price event');
    return new Success({ data: {}, res }).send();
  } catch (err) {
    next(err);
  }
};
