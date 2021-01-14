import mongoose from 'mongoose';
import httpStatus from 'http-status';

import User from './user.model';
import Booking from './booking.model';
import Service from './service.model';
import Provider from './provider.model';
import Option from './option.model';
import Plan from './plan.model';
import Subscription from './subscription.model';
import { APICredentials, APIError } from '../utils';
import {
  createSubscription,
  updateSubscription,
  updateSubscriptionItem,
  cancelSubscription
} from '../lib/stripe';

const { ObjectId } = mongoose.Schema.Types;

const daySchema = new mongoose.Schema({
  working: {
    type: Boolean,
    default: true,
  },
  start: {
    type: String,
    default: '8:00',
  },
  end: {
    type: String,
    default: '18:00',
  },
}, { _id: false, minimize: false });

const workingHoursSchema = {
  monday: {
    type: daySchema,
    default: {},
  },
  tuesday: {
    type: daySchema,
    default: {},
  },
  wednesday: {
    type: daySchema,
    default: {},
  },
  thursday: {
    type: daySchema,
    default: {},
  },
  friday: {
    type: daySchema,
    default: {},
  },
  saturday: {
    type: daySchema,
    default: {},
  },
  sunday: {
    type: daySchema,
    default: {},
  },
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
    default: APICredentials.generateApiKey,
  },
  apiSecret: {
    type: String,
    required: true,
    default: APICredentials.generateApiSecret,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  workingHours: {
    type: workingHoursSchema,
    required: true,
    default: {},
  },
  planId: {
    type: ObjectId,
    required: true,
    set: function (planId) {
      // Caching previous planId
      this._planId = this.planId;
      return planId;
    }
  },
  subscriptionId: {
    type: ObjectId,
  }
}, { timestamps: true });

schema.method({
  /**
   * Finds organizations subscription
   *
   * @returns
   */
  subscription() {
    return Subscription.findOne({ _id: this.subscriptionId }).exec();
  },
  /**
   * Finds all bookings of organization
   *
   * @returns
   */
  bookings({ status, start, end, serviceId, providerId }) {
    let query = { organizationId: this._id };
    if (status && status !== 'all') {
      query.status = status;
    }
    if (serviceId) {
      query.serviceId = serviceId;
    }
    if (providerId) {
      query.providerId = providerId;
    }
    if (start) {
      query.start = { $gte: start };
    }
    if (end) {
      query.start = { $lte: end };
    }
    return Booking.find(query).exec();
  },
  /**
   * Finds all services of organization
   *
   * @param {Object} options - Query options
   * @param {[Boolean]} options.active - Look for active / inactive services if set
   * @returns {Object[]}
   */
  services({ active }) {
    const query = { organizationId: this._id };
    if (active !== undefined) {
      query.active = active;
    }
    return Service.find(query).exec();
  },
  /**
   * Finds all providers of organization
   *
   * @param {Object} options - Query options
   * @param {[Boolean]} options.active - Look for active / inactive provider if set
   * @returns {Object[]}
   */
  providers({ active }) {
    const query = { organizationId: this._id };
    if (active !== undefined) {
      query.active = active;
    }
    return Provider.find(query).exec();
  },
  /**
   * Finds all options of organization
   *
   * @param {Object} options - Query options
   * @param {[Boolean]} options.active - Look for active / inactive option if set
   * @returns {Object[]}
   */
  options({ active }) {
    const query = { organizationId: this._id };
    if (active !== undefined) {
      query.active = active;
    }
    return Option.find(query).exec();
  },
  /**
   * Finds subscription plan of organization
   *
   * @returns {Object[]}
   */
  plan() {
    return Plan.findOne({ _id: this.planId }).exec();
  },
  /**
   * Finds previous subscription plan of organization
   *
   * @returns {Object[]}
   */
  previousPlan() {
    return Plan.findOne({ _id: this._planId }).exec();
  },
  /**
   * Finds owner of organization
   *
   * @returns {Object[]}
   */
  owner() {
    return User.findOne({
      'organizations.organizationId': this._id,
      'organizations.role': 'owner',
    }).exec();
  },
});

schema.pre('save', async function (next) {
  const isPlanModified = this.isModified('planId');

  if (isPlanModified) {
    const plan = await this.plan();
    if (!plan) {
      const error = new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `No subscription plan found with ID ${this.planId}`,
      });
      return next(error);
    }
    if (!plan.active) {
      const error = new APIError({
        status: httpStatus.BAD_REQUEST,
        message: `Subscription plan with ID ${plan._id} is inactive`,
      });
      return next(error);
    }
    // Check if non-free plan is selected
    const { price, stripePriceId } = plan.defaultPrice();
    if (price > 0) {
      const owner = await this.owner();
      // Check if user has billing method added to her account
      const card = await owner.card();
      if (card) {
        // Check if there was already a paid subscription
        if (this.isNew || !this.subscriptionId) {
          // Start new subscription if there was non
          const stripeSubscription = await createSubscription({
            customerId: owner.stripeCustomerId,
            priceId: stripePriceId,
          });
          const [{ id: stripeSubscriptionItemId }] = stripeSubscription.items.data;
          const subscription = new Subscription({
            stripeSubscriptionId: stripeSubscription.id,
            stripeSubscriptionItemId,
          });
          await subscription.save();
          this.subscriptionId = subscription._id;
        } else {
          // Update subscription
          const subscription = await this.subscription();
          await updateSubscription({
            subscriptionId: subscription.stripeSubscriptionId,
            subscriptionItemId: subscription.stripeSubscriptionItemId,
            priceId: stripePriceId,
          });
        }
      } else {
        throw new APIError({
          status: httpStatus.BAD_REQUEST,
          message: 'User doesn\'t have billing method',
        });
      }
    } else {
      // Cancel previous subscription if moving to free plan
      if (this.subscriptionId) {
        const subscription = await this.subscription();
        await cancelSubscription({ subscriptionId: subscription.stripeSubscriptionId });
        await subscription.remove();
        this.subscriptionId = undefined;
      }
    }

    next();
  }
});

const Organization = mongoose.model('Organization', schema);

export default Organization;
