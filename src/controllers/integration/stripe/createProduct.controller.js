import Plan from '../../../models/plan.model';
import { Success } from '../../../utils';

/**
 * Stripe create product event
 *
 * @param {Object} req - Request object
 */
export const createProduct = async (req, res, next) => {
  try {
    const { body: { data: { object: product } } } = req;
    console.log('Stripe create product event');
    const plan = new Plan({
      name: product.name,
      stripeProductId: product.id,
    });
    await plan.save();
    return new Success({ res }).send();
  } catch (err) {
    next(err);
  }
};
