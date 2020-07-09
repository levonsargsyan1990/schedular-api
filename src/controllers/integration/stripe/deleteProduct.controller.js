import { Success } from '../../../utils';

/**
 * Stripe delete product event
 *
 * @param {Object} req - Request object
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { user, body, body: { data } } = req;
    console.log('Stripe delete product event');
    return new Success({ data: {}, res }).send();
  } catch (err) {
    next(err);
  }
};
