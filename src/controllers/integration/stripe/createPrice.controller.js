import httpStatus from 'http-status';

import Plan from '../../../models/plan.model';
import { Success, APIError } from '../../../utils';

/**
 * Stripe create price event
 *
 * @param {Object} req - Request object
 */
export const createPrice = async (req, res, next) => {
  try {
    const { body: { data: { object: price } } } = req;
    console.log('Stripe create price event');
    const plan = await Plan.findOne({ stripeProductId: price.product }).exec();
    if (!plan) {
      const apiError = new APIError({
        status: httpStatus.BAD_REQUEST,
        message: 'No plan found with provided product id',
      });
      next(apiError);
    }
    plan.prices = [...plan.prices, {
      stripePriceId: price.id,
      price: price.unit_amount / 100,
      currency: price.currency,
      isDefault: plan.prices.length === 0,
    }];
    await plan.save();
    return new Success({ res }).send();
  } catch (err) {
    next(err);
  }
};
