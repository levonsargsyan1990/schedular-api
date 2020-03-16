import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  organizationId: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Service = mongoose.model('Service', schema);

export default Service;
