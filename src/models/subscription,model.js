import mongoose from 'mongoose';

import { Organization } from './organization.model';

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  stripeSubscriptionId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

schema.method({
  /**
   * Finds the organization
   *
   * @returns
   */
  organization() {
    return Organization.findOne({ subscriptionId: this._id }).exec();
  },
  /**
   * Finds the paying user
   *
   * @returns
   */
  async payer() {
    const organization = await this.organization(); 
    return organization.owner();
  },
});

const Subscription = mongoose.model('Subscription', schema);

export default Subscription;
