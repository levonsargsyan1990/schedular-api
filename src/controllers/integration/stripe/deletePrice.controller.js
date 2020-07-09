import { Success } from '../../../utils';

/**
 * Stripe delete price event
 *
 * @param {Object} req - Request object
 */
export const deletePrice = async (req, res, next) => {
  try {
    const { user, body, body: { data } } = req;
    console.log('Stripe delete price event');
    return new Success({ data: {}, res }).send();
  } catch (err) {
    next(err);
  }
};
