import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    default: '',
  },
  long: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
});

const schema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  serviceId: {
    type: ObjectId,
    required: true,
  },
  optionId: {
    type: ObjectId,
    required: true,
  },
  providerId: {
    type: ObjectId,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'created',
    enum: ['created', 'canceled', 'completed', 'in-progress'],
  },
  end: {
    type: Date,
    required: true,
  },
  location: {
    type: locationSchema,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  durationTimeUnit: {
    type: String,
    required: true,
    enum: ['s', 'm', 'h'],
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', schema);

export default Booking;
