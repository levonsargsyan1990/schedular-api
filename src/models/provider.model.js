import mongoose from 'mongoose';
import moment from 'moment';
import Booking from './booking.model';
import { datesOverlapArray, containsTimeRange } from '../utils/helpers';

const { ObjectId } = mongoose.Schema.Types;

const daySchema = new mongoose.Schema({
  working: {
    type: Boolean,
    default: true,
  },
  start: {
    type: String,
    default() {
      return this.working ? '8:00' : '';
    },
  },
  end: {
    type: String,
    default() {
      return this.working ? '18:00' : '';
    },
  },
}, { minimize: false });

const workingHoursSchema = new mongoose.Schema({
  monday: {
    type: daySchema,
    default: {},
    required: true,
  },
  tuesday: {
    type: daySchema,
    default: {},
    required: true,
  },
  wednesday: {
    type: daySchema,
    default: {},
    required: true,
  },
  thursday: {
    type: daySchema,
    default: {},
    required: true,
  },
  friday: {
    type: daySchema,
    default: {},
    required: true,
  },
  saturday: {
    type: daySchema,
    default: {},
    required: true,
  },
  sunday: {
    type: daySchema,
    default: {},
    required: true,
  },
}, { minimize: false });

const schema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  services: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  active: {
    type: Boolean,
    default: true,
  },
  workingHours: {
    type: workingHoursSchema,
    required: true,
    default: {},
  },
}, { timestamps: true, minimize: false });

schema.method({
  /**
   * Returns array of bookings for provider
   *
   * @param {Object} [options={}] - optional parameters
   * @param {ObjectId[]} [options.excludedBookings=[]] - array of excluded booking IDs
   * @returns {Object[]}
   */
  async bookings(options = {}) {
    const { excludedBookings = [], start: startTimestamp, end: endTimestamp } = options;
    const query = {
      _id: { $nin: excludedBookings },
      providerId: this._id,
      status: { $nin: ['canceled'] },
      end: { $gte: new Date() },
    };
    if (startTimestamp) {
      query.end = { $gte: new Date(parseInt(startTimestamp, 10)) };
    }
    if (endTimestamp) {
      query.start = { $lte: new Date(parseInt(endTimestamp, 10)) };
    }
    return Booking.find(query).exec();
  },

  /**
   * Returns array of booked periods for provider
   *
   * @param {Object} [options={}] - optional parameters
   * @param {ObjectId[]} [options.excludedBookings=[]] - array of excluded booking IDs
   * @returns {Object[]}
   */
  async bookedDates(options = {}) {
    const bookings = await this.bookings(options);
    return bookings.map(({ start, end }) => ({ start, end }));
  },
  /**
   * Checks if provider is available for specific time period
   *
   * @param {Object} dateRange time period to check
   * @param {Date} dateRange.start start date of period
   * @param {Date} dateRange.end end date of period
   * @param {Object} [options={}] - optional parameters
   * @param {ObjectId[]} [options.excludedBookings=[]] - array of excluded booking IDs
   * @returns {Boolean}
   */
  async isAvailable(dateRange, options = {}) {
    const { excludedBookings = [] } = options;
    const weekDay = moment(dateRange.start).format('dddd').toLowerCase();
    const { working: isWorkDay, start, end } = this.workingHours[weekDay];

    // Checking if provider works that day
    if (!isWorkDay) {
      console.log(`Provider ${this._id} is not working on ${weekDay}`);
      return false;
    }

    // Checking if provider works during those hours
    const timeRange = {
      start: moment(dateRange.start).format('H:mm'),
      end: moment(dateRange.end).format('H:mm'),
    };
    if (!containsTimeRange({ start, end }, timeRange)) {
      console.log(`Provider ${this._id} is only working from ${start} to ${end} on ${weekDay}`);
      return false;
    }

    // Checking if time range doesn't overlap with existing booking
    const bookedDates = await this.bookedDates({ excludedBookings });
    if (datesOverlapArray(dateRange, bookedDates)) {
      console.log(`${dateRange.start} - ${dateRange.end} overlaps with existing booking dates`);
      return false;
    }
    return true;
  },
});

const Provider = mongoose.model('Provider', schema);

export default Provider;
