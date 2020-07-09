import { Success } from '../../../utils';

/**
 * Stripe update product event
 *
 * @param {Object} req - Request object
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { user, body, body: { data } } = req;
    console.log('Stripe update product event');
    return new Success({ data: {}, res }).send();
  } catch (err) {
    next(err);
  }
};
