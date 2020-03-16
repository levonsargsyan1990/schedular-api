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
    type: String,
    required: true,
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
