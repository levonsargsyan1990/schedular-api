import mongoose from 'mongoose';
import moment from 'moment';
import Booking from './booking.model';
import { datesOverlapArray, containsTimeRange } from '../utils/helpers';

const { ObjectId } = mongoose.Schema.Types;

const daySchema = {
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
};

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
    default: [],
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
   * Returns array of booked periods for provider
   *
   * @param {Object} [options={}] - optional parameters
   * @param {ObjectId[]} [options.excludedBookings=[]] - array of excluded booking IDs
   * @returns {Object[]}
   */
  async bookedDates(options = {}) {
    const { excludedBookings = [] } = options;
    const bookings = await Booking.find({
      _id: { $nin: excludedBookings },
      providerId: this._id,
      end: { $gte: new Date() },
    }).exec();
    const bookedDates = bookings.map(({ start, end }) => ({ start, end }));
    return bookedDates;
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
    const { working: isWorkDay, ...workingDayTimeRange } = this.workingHours[weekDay];
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
    if (!containsTimeRange(workingDayTimeRange, timeRange)) {
      console.log(`Provider ${this._id} is only working from ${workingDayTimeRange.start} to ${workingDayTimeRange.end} on ${weekDay}`);
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
