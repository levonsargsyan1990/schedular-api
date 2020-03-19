import mongoose from 'mongoose';
import Booking from './booking.model';
import Service from './service.model';
import Provider from './provider.model';
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
});

const workingHoursSchema = new mongoose.Schema({
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
});

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
    default: true,
  },
  workingHours: {
    type: workingHoursSchema,
    default: {},
  },
}, { timestamps: true });

schema.method({
  /**
   * Finds all bookings of organization
   *
   * @returns
   */
  bookingsAsync() {
    return Booking.find({ organizationId: this._id }).exec();
  },
  /**
   * Finds all services of organization
   *
   * @returns
   */
  servicesAsync({ active }) {
    const query = { organizationId: this._id };
    if (active !== undefined) {
      query.active = active;
    }
    return Service.find(query).exec();
  },
  /**
   * Finds all providers of organization
   *
   * @returns
   */
  providersAsync() {
    return Provider.find({ organizationId: this._id }).exec();
  },
});

const Organization = mongoose.model('Organization', schema);

export default Organization;
