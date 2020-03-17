import mongoose from 'mongoose';
import Booking from './booking.model';

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
  async getBookedDates() {
    const bookings = await Booking.find({ providerId: this._id, end: { $gte: new Date() } }).exec();
    const bookedDates = bookings.map(({ start, end }) => ({ start, end }));
    return bookedDates;
  },
});

const Provider = mongoose.model('Provider', schema);

export default Provider;
