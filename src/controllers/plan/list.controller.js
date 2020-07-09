import Plan from '../../models/plan.model';
import { Success } from '../../utils';

/**
 * Finds all subscription plans
 *
 * @param {Object} req - Request object
 */
export const list = async (req, res, next) => {
  try {
    console.log('Fetching subscription plans');
    const plans = await Plan.find({}).exec();
    return new Success({ data: plans, res }).send();
  } catch (err) {
    next(err);
  }
};
