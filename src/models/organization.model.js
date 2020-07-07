import mongoose from 'mongoose';
import Booking from './booking.model';
import Service from './service.model';
import Provider from './provider.model';
import Option from './option.model';
import { APICredentials } from '../utils';

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
}, { _id : false, minimize: false });

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
}, { timestamps: true });

schema.method({
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
});

const Organization = mongoose.model('Organization', schema);

export default Organization;
