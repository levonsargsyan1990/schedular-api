import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  serviceId: {
    type: ObjectId,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  durationTimeUnit: {
    type: String,
    default: 'm',
    enum: ['s', 'm', 'h'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'AMD',
  },
}, { timestamps: true });

const Option = mongoose.model('Option', schema);

export default Option;
