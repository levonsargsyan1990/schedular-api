import mongoose from 'mongoose';
import find from 'lodash/find';

const priceSchema = new mongoose.Schema({
  stripePriceId: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { _id : false, minimize: false });

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stripeProductId: {
    type: String,
    required: true,
  },
  prices: {
    type: [priceSchema],
    default: []
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

schema.method({
  /**
   * Finds all providers of service
   *
   * @returns
   */
  defaultPrice() {
    return find(this.prices, { default: true });
  },
});

const Plan = mongoose.model('Plan', schema);

export default Plan;
